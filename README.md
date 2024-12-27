# IT3180 Bluemoon

## Getting Started

Follow these steps to set up and run the project on your local machine.

### Prerequisites

Make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v16 or later)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [tsx](https://www.npmjs.com/package/tsx) (if seeding the database is required)

### Steps to Run the Project

1. **Clone the Repository**
   ```bash
   git clone [repository-url]
   ```

2. **Navigate to the Project Directory**
   ```bash
   cd [repo directory]
   ```

3. **Install Dependencies**
   ```bash
   npm i
   ```

4. **Add Environment Variables**
   - Create a `.env` file in the root directory of the project.
   - Add the required environment variables (refer to `.env.example` if available).

5. **Push Database Schema (if applicable)**
   ```bash
   npm run db:push
   ```

6. *(Optional)* **Seed the Database**
   ```bash
   tsx prisma/seed.ts
   ```

7. **Start the Development Server**
   ```bash
   npm run dev
   ```

### Contributing

Please follow the [contributing guidelines](CONTRIBUTING.md) if applicable. Open an issue if you encounter any problems or have questions.

---

Happy coding!
