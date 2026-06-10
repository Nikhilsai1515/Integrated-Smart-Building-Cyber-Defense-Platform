# Integrated Smart Building Cyber Defense Platform

## Overview

The Integrated Smart Building Cyber Defense Platform is a Security Operations Center (SOC) solution designed to monitor, detect, analyze, and respond to cyber threats within smart building environments.

The platform provides real-time network traffic monitoring, threat detection, device discovery, security analytics, and alert management through a centralized Command & Control Dashboard.

This project integrates React, Flask, PostgreSQL, Socket.IO, and Suricata IDS to provide a modern cybersecurity monitoring solution for smart infrastructure.

---

## Features

### Real-Time Traffic Monitoring

* Monitor network communication between building devices
* View source and destination IP activity
* Analyze network events in real time

### Threat Detection Center

* Detect suspicious network behavior
* Severity-based alert classification
* Alert status management (OPEN / CLOSED)
* Live threat notifications using Socket.IO

### Device Discovery

* Track connected smart building devices
* Monitor device status and floor locations
* View IP addresses and host information

### Security Analytics

* Alert severity distribution
* Open vs Closed alert analysis
* Security event statistics
* Visual dashboard analytics

### Report Generation

* Generate PDF security reports
* SOC reporting and documentation
* Incident review support

### Role-Based Access Control

* ADMIN

  * Full system access
* ANALYST

  * Alert management and monitoring
* VIEWER

  * Read-only dashboard access

### Suricata IDS Integration

* Threat detection using Suricata
* EVE JSON log processing
* Alert ingestion and visualization

---

## Technology Stack

### Frontend

* React.js
* Recharts
* Socket.IO Client

### Backend

* Flask
* Flask-SQLAlchemy
* Flask-SocketIO

### Database

* PostgreSQL

### Security Tools

* Suricata IDS

---

## System Architecture

Smart Building Devices

↓

Network Traffic Collection

↓

Suricata IDS

↓

Flask Backend

↓

PostgreSQL Database

↓

Socket.IO Events

↓

React SOC Dashboard

---

## Dashboard Modules

### Dashboard

* Security overview
* Alert statistics
* Device monitoring summary

### Traffic Monitoring

* Network event analysis
* Source/Destination tracking
* Traffic visualization

### Threat Center

* Threat management
* Severity filtering
* Incident handling

### Devices

* Device inventory
* Floor-based monitoring
* Online/Offline status tracking

### Analytics

* Alert distribution charts
* Security metrics
* Incident trends

### Reports

* PDF report generation
* Security documentation

### Settings

* Platform configuration
* Detection engine information
* Database and system status

---

## Project Objectives

* Improve visibility into smart building networks
* Detect cyber threats in real time
* Centralize security monitoring
* Provide actionable threat intelligence
* Enhance incident response capabilities

---

## Future Enhancements

* Live packet capture integration
* Multi-floor building visualization
* Advanced threat correlation
* AI-powered anomaly detection
* Automated incident response
* Geographic threat mapping
* SIEM integration

---

## Author

Nikhilsai Thaduri

Cybersecurity | SOC Operations | Network Security | Threat Detection

---

## License

This project is developed for educational and cybersecurity research purposes.
