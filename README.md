Patient Management System Instructions

1. Prerequisites
   - Ensure Node.js is installed on your system 
   - Git should be installed to clone the repository.

2. Setup
   - Clone the repository to your local machine:

    git clone https://github.com/Jaiv24/project-1.git
    
    - Navigate to the project directory:
    cd PROJECT-1/

    - Install the required dependencies:
    npm install

3. Running the Application
    - Start the application:
    1. Crete database using: node initdb.js 
    2. Start Server: node app.ctrl.js

  
    - Open your browser and go to:
    http://localhost:3000


4. Features
    - Create patient: Add new patient records
    - Read all patients: View list of all patients
    - Read single patient: View details of a specific patient
    - Update patient: Edit patient information
    - Delete patient: Remove patient records
    - Update visit status: Change visit status (Visited/Not Visited)
    - Generate report: View detailed patient report
    - Search patients: Search by name

5. Notes
    - The database file (patients.db) will be created automatically in the project root when the app starts.
