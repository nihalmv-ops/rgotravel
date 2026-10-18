# GoTravel Backend API Server

REST API and image upload backend server for **GoTravel** (supporting both [rgotravel.vercel.app](https://rgotravel.vercel.app) and the standalone Admin portal).

---

## Features

- **Tourist Places API**: Full CRUD with image upload (`multipart/form-data`) or image URL.
- **Tour Packages API**: Full CRUD with package details, duration, capacity, and pricing.
- **Bookings API**: Real-time reservations submitted by travelers and reviewed by admins.
- **Image Uploads**: Powered by `multer` with file-type validation (JPEG, PNG, WebP) and 10MB limits.
- **CORS Configured**: Fully enabled for your production frontend (`https://rgotravel.vercel.app`), local client (`localhost:5173`), and admin panel (`localhost:5174`).
- **Zero-Config Database**: JSON storage included out of the box — no external database setup required to run immediately.

---

## API Endpoints

### 1. Tourist Places (`/api/places` or `/api/destinations`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/places` | List all tourist places (filters: `?search=`, `?category=`, `?country=`) |
| `GET` | `/api/places/:id` | Get details for a specific tourist place |
| `POST` | `/api/places` | Create a tourist place (accepts `image` file or `imageUrl`) |
| `PUT` | `/api/places/:id` | Update a tourist place |
| `DELETE` | `/api/places/:id` | Delete a tourist place |

### 2. Tour Packages (`/api/packages`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/packages` | List all tour packages |
| `POST` | `/api/packages` | Create a tour package |
| `DELETE` | `/api/packages/:id` | Delete a tour package |

### 3. Bookings (`/api/bookings`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/bookings` | List all bookings |
| `POST` | `/api/bookings` | Submit a new customer reservation |
| `PATCH` | `/api/bookings/:id/status` | Update booking status (`Confirmed`, `Pending`, `Cancelled`) |
| `DELETE` | `/api/bookings/:id` | Delete a booking record |

### 4. Standalone Image Upload (`/api/upload`)
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/upload` | Upload image file (`image`), returns `{ url: "..." }` |

---

## Running Locally

```bash
# Navigate to backend folder
cd c:\Project\job\gotravel\gotravel-backend

# Install dependencies
npm install

# Start server
npm start
# OR start with auto-reload:
npm run dev
```

API will run on: **`http://localhost:5000`**

---

## Free Cloud Deployment (Render / Railway)

### Deploy to Render:
1. Push this `gotravel-backend` folder to a GitHub repository (e.g. `github.com/nihalmv-ops/rgotravel-backend`).
2. Go to [render.com](https://render.com) and click **New + $\rightarrow$ Web Service**.
3. Select your repository.
4. Settings:
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Click **Deploy Web Service**!
6. Copy your Render URL (e.g. `https://gotravel-api.onrender.com`) and paste it as `VITE_API_URL` on your Vercel deployment!
