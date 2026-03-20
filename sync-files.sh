#!/bin/bash
# AUTO-SYNC dla syf.antydizajn.pl
# Uruchom: ./sync-files.sh
# Zatrzymaj: Ctrl+C

LOCAL_DIR="/Users/paulinajanowska/AI/ANTIGRAVITY/syf/files/"
REMOTE_USER="danveld"
REMOTE_HOST="s61.mydevil.net"
REMOTE_DIR="/home/danveld/domains/syf.antydizajn.pl/files/"

echo "🔄 SYF FILES AUTO-SYNC"
echo "📁 Obserwuję: $LOCAL_DIR"
echo "📡 Cel: $REMOTE_HOST:$REMOTE_DIR"
echo "⏹️  Zatrzymaj: Ctrl+C"
echo ""

# Pierwsza synchronizacja
echo "▶️  Synchronizuję..."
rsync -avz --delete "$LOCAL_DIR" "$REMOTE_USER@$REMOTE_HOST:$REMOTE_DIR"
echo "✅ Zsynchronizowano!"
echo ""

# Obserwuj zmiany (wymaga fswatch: brew install fswatch)
if command -v fswatch &> /dev/null; then
    echo "👀 Czekam na zmiany..."
    fswatch -0 "$LOCAL_DIR" | while read -d "" event; do
        echo "📝 Zmiana wykryta: $(basename "$event")"
        rsync -avz --delete "$LOCAL_DIR" "$REMOTE_USER@$REMOTE_HOST:$REMOTE_DIR"
        echo "✅ Zsynchronizowano! ($(date +%H:%M:%S))"
    done
else
    echo "⚠️  fswatch nie zainstalowany!"
    echo "   Zainstaluj: brew install fswatch"
    echo "   Lub uruchamiaj ten skrypt ręcznie po zmianach"
fi
