import { collectDefaultMetrics, register } from 'prom-client';
import * as fetch from 'node-fetch';

// Збираємо стандартні метрики Node.js
collectDefaultMetrics({ prefix: 'my_app_' });

async function sendMetricsToGrafanaCloud() {
    try {
        const metrics = await register.metrics();

        const url = `https://oleksandroburlakov.grafana.net/api/v1/push`; // URL для push gateway
        const auth = `Bearer ${process.env.GRAFANA_SA_TOKEN}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': auth,
                'Content-Type': 'text/plain', // Важливо встановити Content-Type
            },
            body: metrics,
        });

        if (!response.ok) {
            const text = await response.text(); // Отримуємо текст помилки з відповіді
            throw new Error(`Failed to send metrics: ${response.status} - ${text}`);
        }

        console.log('Metrics sent to Grafana Cloud successfully!');

    } catch (error) {
        console.error('Error sending metrics to Grafana Cloud:', error);
    }
}

setInterval(sendMetricsToGrafanaCloud, 5000); // або інший інтервал