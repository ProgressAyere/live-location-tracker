# Live Location Tracker

> ⚠️ **For Educational Purposes Only** — This project is intended strictly for learning, demonstrations, and ethical use. Do not use it to track individuals without their explicit consent.

- **Live Location Tracker** It allows you to track live GPS coordinates in real-time and provides visual representations on a map, making it a great tool for showcasing in seminars, educational environments, and ethical hacking demonstrations.

This project was originally cloned from [AryaBandhu/live-location-tracker](https://github.com/AryaBandhu/live-location-tracker) and improved with environment variable support and deployment configuration for platforms like Render.


## Prerequisites
To get this application up and running, ensure you have the following:
- **Node.js** (v16 or higher)

## Installation
1. **Clone the repository**:
```bash
git clone https://github.com/AryaBandhu/live-location-tracker
cd live-location-tracker
```

2. **Install dependencies**:
```bash
npm install
```

3. **Run the application:**
```bash
npm start
```

4. Login credentials
```js
username: admin
password: admin
```

## Persistent target history on Render

Target IDs, locations, and timestamps are stored in `DATA_FILE`. For persistence across
restarts and deploys on Render, attach a persistent disk and set:

```text
DATA_FILE=/var/data/targets.json
```

Without a persistent disk, Render's local filesystem is temporary and saved targets can
be lost when the service restarts or redeploys.