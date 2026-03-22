import { MetadataRoute } from 'next';
import { getAllFiles } from '@/lib/files';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const files = await getAllFiles();
    const baseUrl = 'https://syf.antydizajn.pl';

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
          url: `${baseUrl}/gniewka`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.5,
      },
    ];

    // Dynamic file pages
    const filePages: MetadataRoute.Sitemap = files.map((file) => ({
        url: `${baseUrl}/${file.slug}`,
        lastModified: file.modifiedDate,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    return [...staticPages, ...filePages];
}
