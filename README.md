# 🧪 Bio-Kinetic Gas Predictor

> **A Dual-Model AI System for Predicting Hazardous Sewer Gases ($H_2S$ & $CH_4$)**

![Status](https://img.shields.io/badge/Status-Active-success)
![Backend](https://img.shields.io/badge/Backend-FastAPI-blue)
![Frontend](https://img.shields.io/badge/Frontend-Next.js-black)
![AI](https://img.shields.io/badge/AI-Random_Forest-orange)

## 📌 Project Overview

The **Bio-Kinetic Gas Predictor** is a machine learning-based safety system designed to estimate the concentration of hazardous gases in stagnant water systems. It addresses the critical risks of **sewer gas toxicity** and **drainage explosions**.

Unlike generic linear models, this system utilizes a **Domain-Specific Multi-Model Architecture** to handle the distinct biochemical pathways of different waste sources:

* **Model A ($H_2S$ Specialist):** Optimized for protein-rich **Sewage** (First-Order Decay).
* **Model B ($CH_4$ Specialist):** Optimized for cellulose-rich **Rainwater** (Methanogenesis).

---

## 🚀 Key Features

* **Synthetic Data Engine:** Generates realistic datasets based on **First-Order Kinetics** and the **Arrhenius Equation** to simulate bacterial growth across temperature gradients ($10-50^\circ C$).
* **Dual-AI Core:** A smart routing system that dynamically selects the correct Machine Learning model based on the input water source.
* **Real-time Risk Assessment:** Instantly classifies danger levels (Low, High, Critical) and provides specific health safety advice (e.g., "Evacuate," "Wear Mask").
* **Interactive Dashboard:** A modern, Dark Mode UI built with Next.js and Recharts for visualizing kinetic growth curves.

---

## 🛠️ Tech Stack

| Component | Technology |
| :--- | :--- |
| **Frontend** | Next.js 14, Tailwind CSS, Recharts, Lucide React |
| **Backend** | Python 3.10+, FastAPI, Uvicorn |
| **AI/ML** | Scikit-Learn (Random Forest), Pandas, NumPy, Joblib |
| **Version Control** | Git & GitHub |

---

## ⚙️ Installation & Setup Guide

Follow these steps to set up the project locally on your machine.

### Prerequisites
* Python (v3.8 or higher)
* Node.js (v18 or higher)
* Git

### 1. Clone the Repository
```bash
git clone [https://github.com/sakshi-911/Bio-Kinetic-Gas-Predictor.git](https://github.com/sakshi-911/Bio-Kinetic-Gas-Predictor.git)
cd Bio-Kinetic-Gas-Predictor


cd frontend

# 1. Install Node modules
npm install

# 2. Run the development server
npm run dev

Bio-Kinetic-Gas-Predictor/
├── backend/
│   ├── main.py              # FastAPI Server & Logic Router
│   ├── generate_data.py     # Synthetic Data Generator
│   ├── train_model.py       # ML Training Script
│   ├── requirements.txt     # Python Dependencies
│   └── hazardous_gas_data.csv # Generated Dataset
├── ml_models/
│   ├── h2s_model.pkl        # Trained H2S Model
│   └── methane_model.pkl    # Trained Methane Model
├── frontend/
│   ├── src/app/page.tsx     # Main Dashboard UI
│   ├── public/              # Static Assets
│   └── package.json         # Frontend Dependencies
└── README.md                # Project Documentation