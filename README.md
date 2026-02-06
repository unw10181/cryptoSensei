# CryptoSensei - Gamified Cryptocurrency Portfolio

# Description:

CryptoSensei is a full-stack MERN application that allows users to practice cryptocurrency trading strategies in a risk-free virtual environment. Users manage simulated portfolios using real-time market data, execute buy and sell transactions, monitor performance metrics, and unlock anime-themed achievements as they progress.

The platform is designed to help aspiring investors understand market dynamics while staying engaged through gamification and structured feedback.

---

## Features

- User authentication (register, login, logout)
- Create and manage multiple virtual portfolios
- Execute simulated buy/sell transactions with real-time crypto prices
- Track portfolio performance (total value, gains/losses, ROI)
- Achievement system with anime-themed badges and milestones
- Portfolio analytics and transaction history
- Real-time cryptocurrency price data via CoinGecko API

## Tech Stack

### Frontend

- React
- Tailwind CSS
- Axios
- Chart.js / Recharts

### Backend

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcrypt

## Backend Tree Route

/api
│
├── /auth
│ ├── POST /register # Create new user account
│ ├── POST /login # Authenticate user & return JWT
│ └── POST /logout # Invalidate session
│
├── /users
│ ├── GET /:id # Get user profile
│ ├── PUT /:id # Update user profile
│ └── GET /:id/achievements # Get user's unlocked achievements
│
├── /portfolios
│ ├── GET / # Get all portfolios for logged-in user
│ ├── POST / # Create new portfolio
│ ├── GET /:id # Get single portfolio details
│ ├── PUT /:id # Update portfolio (rename, etc.)
│ ├── DELETE /:id # Delete portfolio
│ └── GET /:id/performance # Get portfolio performance metrics
│
├── /transactions
│ ├── GET /portfolio/:portfolioId # Get all transactions for a portfolio
│ ├── POST / # Create new transaction (buy/sell)
│ ├── GET /:id # Get single transaction details
│ └── DELETE /:id # Delete transaction
│
├── /crypto
│ ├── GET /prices # Get current prices for multiple cryptos
│ ├── GET /price/:symbol # Get current price for specific crypto
│ └── GET /search # Search for cryptocurrencies
│
└── /achievements
├── GET / # Get all available achievements
└── POST /unlock # Check and unlock achievements for user

## Data Flow

+-------------------------+                        +-------------------------+ 
|                         |                        | ACHIEVEMENT             | 
|       USER              |                        |                         | 
+-------------------------+                        +-------------------------+ 
|  ID: Object ID          |                        | id: ObjectId (PK)       | 
|  username: string       +-----------+            | name: String            | 
|  email: string          |           |            | description: String     | 
|  password: string       |           |            | animeCharacter: String  | 
|  virtualBalance         |           |            | imageUrl: String        | 
|                         |           |            | requirement: String     | 
+-----------+-------------+           |            | tier: String            | 
            |                         |            +-----------+-------------+ 
            |                         |                        |               
            |                         |                        |               
            |                         |            +-----------v-------------+ 
 +----------v--------------+          |            |  USER_ACHIEVEMENT       | 
 |                         |          |            |                         | 
 |     PORTFOLIO           |          |            +-------------------------+ 
 +-------------------------+          |            |_id: ObjectId (PK)       | 
 |  id: objectID           |          |            | userId: ObjectId (FK)   | 
 |  userId: ObjectID       |          |            |achievementId: ObjectId(FK)
 |  name: string           +----------+            | unlockedAt: Date        | 
 |  created: Date          +----------+            |                         | 
 |  currentValue: number   |          |            |                         | 
 |  cashBalance: number    |          |            +-------------------------+ 
 +-----------+-------------+          |                                        
             |                        |                                        
             |                        |                                        
             |                        |                                        
             |                        |                                        
  +----------v--------------+         |                                        
  |                         |         |                                        
  |    Transaction          |         |                                        
  +-------------------------+         |                                        
  |                         |         |                                        
  |  id: ObjectId (PK)      +---------+                                        
  |  portfolioId: ObjectId(FK)                                                 
  |  cryptoSymbol: String (e.g."BTC")                                          
  |  cryptoName: String (e.g., "Bitcoin")                                      
  |  type: String ("buy" / "sell")                                             
  |  quantity: Number       |                                                  
  |  pricePerCoin: Number   |                                                  
  |  totalValue: Number     |                                                  
  |  timestamp: Date        |                                                  
  |                         |                                                  
  |                         |                                                  
  |                         |                                                  
  |                         |                                                  
  |                         |                                                  
  +-------------------------+                                                  

Data Flow:

User registers/logs in → Creates User document
User creates portfolio → Portfolio document linked to User
User executes trades → Transaction documents linked to Portfolio
System checks achievements after actions → Unlocks UserAchievement entries
Real-time crypto prices fetched from CoinGecko API (not stored in DB)

### Planning:

## Trello Board Link:

https://uchenna-williams-cryptosensei.atlassian.net/jira/core/projects/CRYP/board?filter=&groupBy=status&atlOrigin=eyJpIjoiNWYwYjgyODhiOTY4NGJhYmExZWJjNjUwMTAxNjk2NzciLCJwIjoiaiJ9

## Future Features

    - AI-powered trading recommendations
    -	Social trading and leaderboards
    -	Advanced risk analysis
    -	Cloud deployment (AWS/GCP)
    -	Two-factor authentication
    -	Mobile optimization

## Author

Uchenna Williams
Per Scholas MERN
