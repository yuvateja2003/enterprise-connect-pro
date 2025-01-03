# EnterpriseConnect Pro

EnterpriseConnect Pro is a comprehensive communication tracking and management system designed for businesses to efficiently manage their interactions with various companies. This application helps streamline the process of scheduling, tracking, and analyzing communications across multiple channels.

## Objective

EnterpriseConnect Pro ensures timely and consistent follow-ups by providing a centralized platform to log past interactions, plan future communications, and manage engagement schedules effectively.

## Demo

Check out the live demo of the application here: [EnterpriseConnect Pro Demo](https://kzmgt1fp0trmbzeb1yli.lite.vusercontent.net/)

## Features

### Dashboard
- Overview of communication tracking, including:
  - Total companies
  - Upcoming communications
  - Due communications
- Color-coded highlights:
  - **Red**: Overdue communication.
  - **Yellow**: Communication due today.

### Company Management
- Add, edit, and delete company profiles with the following details:
  - Name, Location, LinkedIn Profile, Emails, Phone Numbers, Comments, and Communication Periodicity.

### Communication Tracking
- Log and track various types of communications:
  - LinkedIn Post, Email, Phone Call, and more.
- Reset highlights upon logging communication.
- View past communications and plan future engagements in the calendar.

### Admin Panel
- Manage communication methods with the following details:
  - Name, Description, Sequence, and Mandatory flag.

### Calendar View
- Visualize your communication schedule with:
  - Past communications.
  - Upcoming engagements.

### Reporting and Analytics (Optional)
- Generate reports to analyze communication frequency and effectiveness:
  - Communication frequency reports with filters.
  - Engagement effectiveness metrics.
  - Overdue communication trends with visualizations.
- Export reports in PDF or CSV formats.

### Additional Features
- **Responsive Design**: Works seamlessly on desktop and mobile devices.
- **Dark Mode**: Toggle between light and dark themes for better usability.
- **Interactive Tooltips**: Hover over past communications to view notes or comments.
- **Real-Time Notifications**: Badge notifications for overdue and due communications.

## Technologies Used

- **Next.js 13**: App Router for efficient routing.
- **React**: Core library for building the UI.
- **TypeScript**: For type-safe development.
- **Tailwind CSS**: For modern styling.
- **shadcn/ui Components**: Pre-built UI components.
- **Framer Motion**: For smooth animations.
- **next-themes**: For managing light/dark themes.

## Installation

### Prerequisites
- Node.js (version >= 16)
- npm or yarn package manager

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/enterprise-connect-pro.git
   ```
2. Navigate to the project directory:
   ```bash
   cd enterprise-connect-pro
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Usage

1. Access the Admin Panel to add and manage company profiles and communication methods.
2. Use the Dashboard to:
   - View upcoming and due communications.
   - Log new communications with notes and reset statuses.
3. Navigate to the Calendar View for a detailed overview of past and future engagements.
4. Generate reports in the Reporting and Analytics section to track communication trends and effectiveness.

## Folder Structure

```plaintext
src/
├── components/          # Reusable UI components
├── pages/               # Page-level components
├── services/            # API calls and business logic
├── utils/               # Utility functions
├── styles/              # Global and component-specific styles
├── assets/              # Static assets like images and icons
```

## Contributing

Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m "Add feature"`).
4. Push the branch (`git push origin feature-name`).
5. Submit a Pull Request.

## License

This project is licensed under the [MIT License](LICENSE). Feel free to use and modify the code for your purposes.

## Contact

For questions or clarifications, please reach out to us at [hr@entnt.in](mailto:hr@entnt.in).
