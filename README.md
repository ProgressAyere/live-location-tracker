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

## MongoDB configuration

Target IDs, locations, and timestamps are stored in MongoDB. Create a MongoDB Atlas
free-tier cluster, add your Render service's outbound access (or allow `0.0.0.0/0`),
create a database user, and set these Render environment variables:

```text
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
MONGODB_DB=live-location-tracker
```

The application creates the `targets` collection and its index automatically. Do not
commit `MONGODB_URI`; keep it in Render environment variables.