import { Document, Packer, Paragraph, TextRun, HeadingLevel, BorderStyle } from 'docx';

/**
 * Eksportuje Markdown do DOCX
 */
export async function exportAsDocx(markdown: string, title: string): Promise<Buffer> {
    // Parse markdown to sections
    const lines = markdown
        .replace(/^---[\s\S]*?---\n?/, '') // Remove frontmatter
        .split('\n');

    const children: Paragraph[] = [];

    // Title
    children.push(
        new Paragraph({
            text: title,
            heading: HeadingLevel.TITLE,
            spacing: { after: 400 },
        })
    );

    let inCodeBlock = false;
    let codeBlockContent: string[] = [];

    for (const line of lines) {
        // Code block handling
        if (line.startsWith('```')) {
            if (inCodeBlock) {
                // End code block
                children.push(
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: codeBlockContent.join('\n'),
                                font: 'Courier New',
                                size: 20,
                            }),
                        ],
                        border: {
                            left: { style: BorderStyle.SINGLE, size: 12, color: 'AA00FF' },
                        },
                        spacing: { before: 200, after: 200 },
                    })
                );
                codeBlockContent = [];
                inCodeBlock = false;
            } else {
                inCodeBlock = true;
            }
            continue;
        }

        if (inCodeBlock) {
            codeBlockContent.push(line);
            continue;
        }

        // Headers
        if (line.startsWith('# ')) {
            children.push(
                new Paragraph({
                    text: line.replace(/^# /, ''),
                    heading: HeadingLevel.HEADING_1,
                    spacing: { before: 400, after: 200 },
                })
            );
        } else if (line.startsWith('## ')) {
            children.push(
                new Paragraph({
                    text: line.replace(/^## /, ''),
                    heading: HeadingLevel.HEADING_2,
                    spacing: { before: 300, after: 150 },
                })
            );
        } else if (line.startsWith('### ')) {
            children.push(
                new Paragraph({
                    text: line.replace(/^### /, ''),
                    heading: HeadingLevel.HEADING_3,
                    spacing: { before: 200, after: 100 },
                })
            );
        } else if (line.startsWith('- ') || line.startsWith('* ')) {
            // List item
            children.push(
                new Paragraph({
                    children: [
                        new TextRun({ text: '• ' }),
                        new TextRun({ text: line.replace(/^[-*] /, '') }),
                    ],
                    indent: { left: 720 },
                })
            );
        } else if (line.startsWith('> ')) {
            // Blockquote
            children.push(
                new Paragraph({
                    children: [
                        new TextRun({
                            text: line.replace(/^> /, ''),
                            italics: true,
                        }),
                    ],
                    border: {
                        left: { style: BorderStyle.SINGLE, size: 12, color: 'FF00FF' },
                    },
                    indent: { left: 360 },
                })
            );
        } else if (line.startsWith('---') || line.startsWith('***')) {
            // Horizontal rule
            children.push(
                new Paragraph({
                    border: {
                        bottom: { style: BorderStyle.SINGLE, size: 6, color: 'FF6600' },
                    },
                    spacing: { before: 200, after: 200 },
                })
            );
        } else if (line.trim() !== '') {
            // Regular paragraph - parse inline formatting
            const runs: TextRun[] = [];
            let remaining = line;

            // Simple parsing for bold and italic
            while (remaining.length > 0) {
                const boldMatch = remaining.match(/\*\*([^*]+)\*\*/);
                const italicMatch = remaining.match(/(?<!\*)\*([^*]+)\*(?!\*)/);
                const codeMatch = remaining.match(/`([^`]+)`/);

                if (boldMatch && (!italicMatch || boldMatch.index! <= italicMatch.index!) && (!codeMatch || boldMatch.index! <= codeMatch.index!)) {
                    // Add text before bold
                    if (boldMatch.index! > 0) {
                        runs.push(new TextRun({ text: remaining.substring(0, boldMatch.index) }));
                    }
                    runs.push(new TextRun({ text: boldMatch[1], bold: true }));
                    remaining = remaining.substring(boldMatch.index! + boldMatch[0].length);
                } else if (codeMatch && (!italicMatch || codeMatch.index! <= italicMatch.index!)) {
                    // Add text before code
                    if (codeMatch.index! > 0) {
                        runs.push(new TextRun({ text: remaining.substring(0, codeMatch.index) }));
                    }
                    runs.push(new TextRun({ text: codeMatch[1], font: 'Courier New' }));
                    remaining = remaining.substring(codeMatch.index! + codeMatch[0].length);
                } else if (italicMatch) {
                    // Add text before italic
                    if (italicMatch.index! > 0) {
                        runs.push(new TextRun({ text: remaining.substring(0, italicMatch.index) }));
                    }
                    runs.push(new TextRun({ text: italicMatch[1], italics: true }));
                    remaining = remaining.substring(italicMatch.index! + italicMatch[0].length);
                } else {
                    // No more formatting
                    runs.push(new TextRun({ text: remaining }));
                    break;
                }
            }

            children.push(
                new Paragraph({
                    children: runs,
                    spacing: { after: 120 },
                })
            );
        } else {
            // Empty line = paragraph break
            children.push(new Paragraph({ spacing: { after: 120 } }));
        }
    }

    const doc = new Document({
        sections: [
            {
                properties: {},
                children,
            },
        ],
    });

    return await Packer.toBuffer(doc);
}
