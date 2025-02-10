const { collectDefaultMetrics, register } = require('prom-client');
const { pushMetrics } = require('@grafana/agent-prom');

// Збираємо стандартні метрики Node.js
collectDefaultMetrics({ prefix: 'my_app_' });

// Функція для відправки метрик до Grafana Cloud
async function sendMetricsToGrafanaCloud() {
    try {
        const metrics = await register.metrics();
        await pushMetrics({
            url: 'https://oleksandroburlakov.grafana.net/api/v1/write', // Замініть на свій URL
            headers: {
                'Authorization': `Bearer ${process.env.GRAFANA_API_KEY}`, // API ключ з Grafana Cloud
            },
            body: metrics,
        });
        console.log('Metrics sent to Grafana Cloud successfully!');
    } catch (error) {
        console.error('Error sending metrics to Grafana Cloud:', error);
    }
}

// Періодично відправляємо метрики (наприклад, кожні 5 секунд)
setInterval(sendMetricsToGrafanaCloud, 5000);

// Експортуємо функцію для використання в інших частинах коду (за необхідності)
module.exports = { sendMetricsToGrafanaCloud };