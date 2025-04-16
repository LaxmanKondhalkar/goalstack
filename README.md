# GoalStack – Frontend UI Hackathon 2025 Submission

GoalStack is a submission for **Frontend UI Hackathon 2025 (#2)** under the **Dashboards and Data Visualization** category. It’s a modern, responsive savings goal tracker that allows users to visually manage and track progress toward their financial objectives with engaging UI elements and smooth interactions.

Hosted at : [GoalStack.netlify.app](https://goalstack.netlify.app)

## 📋 Overview

GoalStack is a web application designed to help users set, track, and achieve their savings goals. With an intuitive and responsive interface, users can create multiple savings goals, track their progress, and stay motivated through visual feedback and progress indicators.

## ✨ Features

- **Goal Management**: Create, view, and manage multiple savings goals
- **Progress Tracking**: Visual progress indicators with percentage completion
- **Interactive UI**: Smooth animations and responsive design
- **Status Indicators**: Dynamic status messages based on progress
- **Consistent Design**: Unified design language across components

## 🚀 Technologies

Submitted for: [Frontend UI Hackathon 2025](https://form.typeform.com/to/Hljx9wab)

- **Framework**: Next.js (React)
- **Styling**: Tailwind CSS with custom variables
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 🛠️ Setup and Installation

1. **Clone the repository**

```bash
git clone https://github.com/laxmankondhalkar/GoalStack.git
cd GoalStack
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Run the development server**

```bash
npm run dev
# or
yarn dev
```

4. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📂 Project Structure

```
/app
  /components
    - GoalCard.tsx       # Individual goal card component
    - GoalsList.tsx      # Container for goal cards
    - AddGoalForm.tsx    # Form for adding new goals
    - ...
  /types
    - index.ts           # TypeScript type definitions
  /pages
    - index.tsx          # Homepage
    - ...
/public
  - ...                  # Static assets
```

## 🎨 Design System

GoalStack uses a custom design system with CSS variables for consistent theming:

- **Color Themes**: Primary, Secondary, and Accent color palettes
- **Card Variants**: Default, Elevated, and Bordered styles
- **Progress Indicators**: Color-coded based on completion percentage
- **Interactive Elements**: Animated buttons and cards

## 🔧 Usage

1. **Create a new goal** by clicking the "+" button
2. **Enter goal details** including name, target amount, and icon
3. **Track progress** as you add funds to your goals
4. **Visualize completion** through progress bars and status indicators

## 🤝 Contributing

Contributions are welcome! (Note: This is a hackathon submission, so feature requests and improvements are welcome after the judging period.)

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)
- Submitted as part of Frontend UI Hackathon 2025 organized by Outlier
