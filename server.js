const express = require('express');
const app = express();
app.use(express.json());

const BOT_TOKEN = '8759450921:AAF-xjlMLNEv9AzbmyRJ630RLr9fpxyr_Hk';
const YOUR_CHAT_ID = '5323502244';

// Хранилище статистики
let currentStats = {
    visitors: 0,
    subscribers: 0,
    emails: []
};

// Обработка команды /stats от бота
app.post('/webhook', async (req, res) => {
    const message = req.body.message;
    if (!message || !message.text) {
        return res.send('ok');
    }
    
    if (message.text === '/stats') {
        // Формируем ответ
        let reply = `📊 СТАТИСТИКА САЙТА\n\n`;
        reply += `👥 Уникальных посетителей: ${currentStats.visitors}\n`;
        reply += `📧 Подписчиков: ${currentStats.subscribers}\n\n`;
        
        if (currentStats.emails.length > 0) {
            reply += `📨 Последние 5 подписчиков:\n`;
            currentStats.emails.forEach((email, i) => {
                reply += `${i+1}. ${email}\n`;
            });
        } else {
            reply += `📨 Пока нет подписчиков.`;
        }
        
        // Отправляем ответ в Telegram
        try {
            await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chat_id: YOUR_CHAT_ID, text: reply })
            });
        } catch(e) {
            console.log('Ошибка отправки сообщения');
        }
    }
    res.send('ok');
});

// Получение статистики с твоего сайта
app.post('/update-stats', (req, res) => {
    currentStats = req.body;
    console.log('📊 Статистика обновлена:', currentStats);
    res.send('ok');
});

// Запуск сервера
app.listen(3000, () => console.log('✅ Бот запущен на порту 3000'));
