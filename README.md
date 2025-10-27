# 📄 Phani Kumar Vankadari - Digital Resume

A modern, interactive digital resume built with SAP UI5/Fiori framework showcasing professional experience, skills, and achievements in an elegant Object Page layout.

![Resume Preview](webapp/images/profile.jpg)

## 🌟 Features

- **Interactive Timeline** - Visual career progression with clickable experience details
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices  
- **Professional Layout** - SAP Fiori Object Page design pattern
- **Clickable Experience** - Click on experience table rows to view detailed highlights
- **Skills Visualization** - Rating indicators and categorized skill breakdown
- **Contact Integration** - Direct email, phone, and LinkedIn links
- **PDF Download** - Downloadable resume in PDF format
- **Modern UI** - Clean, professional styling with SAP Horizon theme

## 🚀 Technologies Used

- **SAP UI5** (v1.141.0) - Frontend framework
- **SAPUI5 Timeline Component** - Interactive career timeline
- **Object Page Layout (UXP)** - SAP Fiori design pattern
- **JSON Model** - Data binding and management
- **CSS3** - Custom styling and animations
- **Node.js** - Development server
- **UI5 Tooling** - Build and development tools

## 📁 Project Structure

```
app2/
├── webapp/
│   ├── Component.js                 # Main component
│   ├── index.html                   # Application entry point
│   ├── manifest.json                # App configuration
│   ├── controller/
│   │   └── ObjectPageWithLinksAndObjectStatus.controller.js
│   ├── view/
│   │   ├── ObjectPageWithLinksAndObjectStatus.view.xml
│   │   └── ExperienceHighlights.fragment.xml
│   ├── model/
│   │   ├── resume.json              # Resume data
│   │   ├── formatter.js             # Data formatters
│   │   └── profile.jpg              # Profile image
│   └── images/
├── ui5.yaml                         # UI5 tooling configuration
├── package.json                     # Dependencies and scripts
└── README.md                        # This file
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher) OR Docker
- npm or yarn (if running without Docker)

### Option 1: Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd app2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open in browser**
   ```
   http://localhost:8081
   ```

### Option 2: Docker Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd app2
   ```

2. **Build and run with Docker**
   ```bash
   # Build Docker image
   npm run docker:build
   
   # Run container
   npm run docker:run
   ```

3. **Or use Docker Compose (Recommended)**
   ```bash
   # Development mode
   npm run docker:dev
   
   # Production mode (with nginx proxy)
   npm run docker:prod
   ```

4. **Open in browser**
   ```
   http://localhost:8081
   ```

### Option 3: Docker Commands

```bash
# Build the image
docker build -t phani-resume-app .

# Run the container
docker run -d -p 8081:8081 --name resume-app phani-resume-app

# View logs
docker logs resume-app

# Stop and remove
docker stop resume-app && docker rm resume-app
```

## 🎯 Key Functionalities

### Interactive Experience Table
- Click on any row in the Experience Summary table
- View detailed highlights and achievements in a popover
- Professional formatting with bullet points

### Career Timeline
- Horizontal timeline showing career progression
- Visual representation of work experience
- Company names, job titles, and locations

### Skills Section
- Technical skills with star ratings
- Categorized skill breakdown
- Visual rating indicators

### Contact Actions
- **Download Resume** - PDF download functionality
- **LinkedIn** - Direct link to LinkedIn profile
- **Email Me** - Opens default email client

## 📊 Resume Data Structure

The resume data is stored in `webapp/model/resume.json`:

```json
{
  "profile": {
    "name": "Professional Name",
    "title": "Job Title",
    "email": "email@example.com",
    "phone": "+123456789",
    "linkedin": "https://linkedin.com/in/profile",
    "location": "City, Country"
  },
  "experience": [
    {
      "company": "Company Name",
      "title": "Job Title",
      "location": "City, Country",
      "start": "YYYY-MM-DD",
      "end": "YYYY-MM-DD",
      "highlights": [
        "Achievement 1",
        "Achievement 2"
      ]
    }
  ],
  "skills": [...],
  "education": [...],
  "certifications": [...]
}
```

## 🐳 Docker Configuration

### Dockerfile Features
- **Multi-layer optimization** - Efficient layer caching for faster builds
- **Security** - Non-root user execution
- **Health checks** - Built-in application health monitoring
- **Alpine Linux** - Minimal security footprint
- **Production ready** - Optimized for production environments

### Docker Compose Services
- **ui5-resume** - Main application service
- **nginx-proxy** - Optional reverse proxy for production
- **Networks** - Isolated container networking
- **Volumes** - Persistent data storage

### Environment Variables
```bash
NODE_ENV=production          # Runtime environment
UI5_HOST=0.0.0.0            # Host binding
UI5_PORT=8081               # Application port
```

### Docker Scripts
```bash
npm run docker:build       # Build Docker image
npm run docker:run         # Run single container
npm run docker:dev         # Development with compose
npm run docker:prod        # Production with nginx
npm run docker:stop        # Stop all services
npm run docker:clean       # Clean up resources
```

## 🎨 Customization

### Updating Resume Data
Edit `webapp/model/resume.json` to update:
- Personal information
- Work experience and highlights
- Skills and ratings
- Education and certifications

### Styling
Modify CSS in `webapp/index.html` for:
- Color schemes
- Fonts and typography
- Layout adjustments
- Profile image styling

### Adding New Sections
1. Update the JSON data model
2. Add new ObjectPageSection in the view
3. Implement controller logic if needed

## 🚀 Deployment

### Local Build for Production
```bash
npm run build
```

### Docker Deployment

#### Development Environment
```bash
# Start development environment with live reload
docker-compose up --build

# Or use npm script
npm run docker:dev
```

#### Production Environment
```bash
# Start production environment with nginx proxy
docker-compose --profile production up -d

# Or use npm script
npm run docker:prod
```

#### Container Management
```bash
# Stop all services
npm run docker:stop

# Clean up Docker resources
npm run docker:clean

# View container logs
docker-compose logs -f ui5-resume
```

### Cloud Deployment

#### Deploy to SAP BTP
```bash
# Configure destination and deploy
cf push
```

#### Deploy to Container Platforms
```bash
# Docker Hub
docker tag phani-resume-app your-username/phani-resume-app
docker push your-username/phani-resume-app

# AWS ECS, Google Cloud Run, Azure Container Instances
# Use the Docker image with your preferred container orchestration platform
```

#### Static Hosting
The built application can be hosted on any static web server:
- Netlify
- Vercel
- GitHub Pages
- AWS S3
- Azure Static Web Apps

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Phani Kumar Vankadari**
- LinkedIn: [phani-kumar-vankadari](https://www.linkedin.com/in/phani-kumar-vankadari/)
- Email: phani.kumar.vankadari@gmail.com
- Location: Helsinki, Finland

## 🏆 Achievements

- 19+ years of SAP development experience
- SAP BTP and Integration Architect
- Expert in ABAP, Fiori/UI5, and SAP Integration Suite
- Multiple hackathon winner and innovation leader

---

⭐ **Star this repository if you found it helpful!**
