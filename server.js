const express = require('express');
const app = express();
app.use(express.json());

const BOT_TOKEN = '8759450921:AAF-xjlMLNEv9AzbmyRJ630RLr9fpxyr_Hk';
const YOUR_CHAT_ID = '5323502244';

app.post('/webhook', async (req, res) => {
    const message = req.body.message;
    if (!message || !message.text) return res.send('ok');
    
    if (message.text === '/stats') {
        const stats = `📊 СТАТИСТИКА САЙТА\n\n👥 Посетителей: данные собираются...\n📧 Подписчиков: данные собираются...\n\n📨 Скоро здесь будет полная статистика!`;
        
        try {
            await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chat_id: YOUR_CHAT_ID, text: stats })
            });
        } catch(e) {}
    }
    res.send('ok');
});

app.listen(3000, () => console.log('✅ Бот запущен на порту 3000'));