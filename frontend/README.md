SCHOOL MANAGEMENT SYSTEM FRONTEND

To start frontend :
    cd frontend
    npm run dev

frontend: 

used files and folders:
src
gitignore -ignored nodemodule
index.html -added title name School Management
package.json
README.md

In src:
components - signUp      - loginForm.jsx
                         - registerForm.jsx
                         - signUp.css 
                         - protectedRoute
           - Students    - StudentsForm.jsx,css
                         - StudentsList.jsx,css        
           - Fees        - FeesForm.jsx,css
                         - FeesList.jsx,css
           - LibraryBook - LibraryForm.jsx,css
                         - LibraryList.jsx,css
                           
pages     - homePage           - HomePage.jsx - contain signup and login box.

          - adminDashboard     - adminDashboard.jsx - contain students form to enter details.In navbar    there is buttons to navigate to staff dashboard and librarian dashboard,History button to see the list of student's detaillist,feeslist and librarylist.

                               - StudentsDetails.jsx - entered student details are listed.can also edit and delete details .

          - staffDashboard     - StaffDashboard.jsx-contain fees entry form to enter fees details.In navbar there is buttons to see the list of student's detail list,fees list and librarylist.

                               - FeesHistory.jsx-entered fees details are listed.can also edit and delete details .

          - librarianDashboard - LibrarianDashboard.jsx- contain librarian entry form to enter library book details.In navbar there is buttons to see the list of student's detail list and librarylist. 

                               - LibraryHistory.jsx-entered library book details are listed.can also edit and delete details .

redux-toolkit   - store.js  -auth,student,fee,library reducers/slices are stored here

                - authSlice.js -createAsyncThunk for action like register and login by making API calls to a backend server.The slice stores the user information, token, and authentication status in the state, and it also provides a logout function to clear user data and token from localStorage.

                - studentSlice.js- manages the state for a list of students, including actions like fetching, adding, updating, and deleting students. It uses createAsyncThunk to handle asynchronous requests to a backend API with authentication through a token. The state includes the list of students, loading status, and error handling.

                - feeSlice.js -manages the state for handling fees, including fetching, adding, updating, and deleting fee records. It uses createAsyncThunk for asynchronous requests to a backend API and handles loading states, error management, and updating the fee list in the state.

                - librarySlice.js-  manages the state for library records, including fetching, adding, updating, and deleting book history.  It uses createAsyncThunk for asynchronous API calls to handle library records, including proper authorization using tokens and error handling for each operation.

App.jsx       -uses React Router to manage routing between various pages, including dashboards for admin, staff, and librarian, as well as pages for student details, fees history, and library history.added protected route according to the role whom can access the specified pages.

index.css -main css file

main.jsx   - initializes the React application by rendering the App component within the Redux Provider, connecting the application to the Redux store for state management.