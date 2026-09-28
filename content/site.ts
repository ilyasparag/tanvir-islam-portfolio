/**
 * Single source of truth for every fact on this site.
 *
 * Three content rules are deliberate, not oversights:
 *
 * 1. No CGPA anywhere. A personal site is not an application form, and an
 *    unprompted metric would be the first number a recruiter reads. Education
 *    carries no grades at all, so the omission is consistent rather than
 *    conspicuous.
 * 2. The UCBL work is described at capability level only. No database versions,
 *    host names, instance counts or vendor topology — that information maps a
 *    regulated bank's estate. Anything added here must clear the same bar.
 * 3. Referees are named nowhere. "Available on request" only.
 *
 * Skills and stacks list what the source documents actually claim. Do not add
 * a library because a project probably used one.
 */

export type ProjectKind = "internship" | "thesis" | "paper" | "academic" | "data";

export type Project = {
  slug: string;
  title: string;
  kind: ProjectKind;
  year: number;
  period: string;
  /** Short enough to sit in a table cell. */
  stack: string[];
  /** The hook, 6–10 words. Sits above the summary on a card and has to earn
   *  the read — it is not a shorter summary, it is the reason to care. */
  headline: string;
  /** One line, used on cards and in the catalogue. */
  summary: string;
  /** Detail page prose. */
  body: string[];
  contributions?: string[];
  /** What he took away from it. For a fresher this is the line that carries weight. */
  learned: string;
  /** Honest label. Coursework is labelled as coursework. */
  badge: string;
  /** Rendered as a disclosure note on the detail page. */
  restricted?: string;
  status?: string;
  /** Only set when the repo actually has something in it to read. */
  repoUrl?: string;
  /** The actual script behind the project, shown verbatim on the detail page. */
  code?: { language: string; source: string };
  /** Downloadable source files served from /public, e.g. the report or raw script. */
  files?: { label: string; href: string }[];
  /** Screenshots of a sanitized demo build — never the real restricted tool. */
  screenshots?: { src: string; alt: string }[];
};

export const profile = {
  name: "Tanvir Islam",
  shortName: "Tanvir",
  title: "Database systems & applied machine learning",
  // Fresher voice: curious and specific, not a specialist's claim to authority.
  positioning:
    "I build things with databases, then take them apart to find out why they broke.",
  // The hero paragraph. Same rewrite as `about[0]`, minus the "I'm Tanvir —"
  // opener: on the homepage it sits directly under the name set at 6.6rem, so
  // introducing himself again there would read as a stutter.
  intro:
    "A CSE graduate from AIUB, currently doing my internship as a Database Administrator at UCBL. I picked Information Systems as my track because I was always more curious about what's happening underneath an app than the app itself: how the data is structured, and how well a schema holds up once real use starts pulling at it.",
  /**
   * About-page prose, in the client's own words.
   *
   * The previous draft was flagged in review as reading AI-written — not for
   * any single sentence but for the pattern: setup-and-reversal constructions
   * ("The two look unrelated. They are not:"), every paragraph landing on a
   * tidy abstraction, and no first-person slips anywhere. This copy is the
   * client's supplied rewrite. Keep the plainer register and the contractions
   * if you edit it; do not polish the friction back out.
   */
  about: [
    "I'm Tanvir — a CSE graduate from AIUB, currently doing my internship as a Database Administrator at UCBL. I picked Information Systems as my track because I was always more curious about what's happening underneath an app than the app itself: how the data is structured, and how well a schema holds up once real use starts pulling at it.",
    "Interning inside a bank made that concrete fast. In a production, regulated environment, a database nobody documented isn't just messy — you can't patch it, back it up, or plan capacity for it, because as far as anyone can tell, it doesn't exist.",
    "My final-year thesis pulled me somewhere different: using machine learning to pick up early signs of laryngeal disease from voice recordings. It doesn't look related to database work, but it's asking the same underlying question — what does a representation of something actually capture, and what does it leave out?",
    "Right now I'm most interested in where machine learning can genuinely support database work — anomaly detection, capacity forecasting, query behaviour — rather than places it's just fashionable to bolt on.",
  ],
  // Home and About shared one description word for word, so both pages looked
  // identical in search results and link previews. This one is About's alone.
  aboutMeta:
    "CSE graduate from AIUB and database administration intern at UCBL — how I got here, what I studied, and the work I am looking for next.",
  seeking:
    "Looking for my first full-time role in database administration, data, or IT operations.",
  // Short close for pages that should not repeat the full homepage contact
  // block. About ends on this instead of a second copy of the site's ending.
  signoff: "Open to full-time DBA, data and IT operations roles.",
  location: "Dhaka, Bangladesh",
  email: "islamtanvir1811@gmail.com",
  phone: "+88 01740-640605",
  links: {
    linkedin: "https://linkedin.com/in/tanvir-islam-8760a03aa",
    github: "https://github.com/islamtanvir42",
  },
  availability: "Open to roles in database administration, data, and IT operations.",
};

export const projects: Project[] = [
  {
    slug: "database-inventory-service",
    badge: "Internship",
    learned:
      "That the hard part was never the CRUD. It was deciding what counts as the authoritative record, and who is allowed to change it.",
    title: "Database Inventory Service",
    kind: "internship",
    year: 2026,
    period: "2026 — in progress",
    stack: ["FastAPI", "PostgreSQL", "React"],
    headline: "Turning a spreadsheet nobody fully trusted into a system of record.",
    summary:
      "An internal service that catalogues a bank's database estate, replacing a manual tracking process.",
    body: [
      "Large organisations tend to lose track of their own databases. Instances get provisioned for a project, ownership moves, and the authoritative record quietly becomes a spreadsheet that only one person maintains. That is a reliability problem before it is anything else: you cannot patch, back up, or plan capacity for something you do not know exists.",
      "This is an internal tool built during my internship to make that estate legible — a catalogue of database instances with their owners and operational metadata, maintained as a service rather than as a document. A FastAPI backend over PostgreSQL, with a React front end for the people who need to read and correct the record.",
      "The interesting part is not the CRUD. It is deciding what the authoritative record should be, who is allowed to change it, and how the catalogue stays true as the estate moves underneath it.",
    ],
    contributions: [
      "Designed the catalogue schema and the API over it",
      "Built the FastAPI service and its PostgreSQL persistence layer",
      "Built the React interface used to review and correct records",
    ],
    restricted:
      "This work sits inside a regulated bank. The description here is deliberately limited to capability and stack — no database versions, host names, instance counts, or topology, and the real tool is not shown. The screenshots below are from a separate demo I built on my own time, with entirely fictional servers and data, just to show what the interface looks like.",
    status: "In progress",
    screenshots: [
      {
        src: "/projects/database-inventory-service/landing.png",
        alt: "Sign-in screen for the demo build of the database inventory tool",
      },
      {
        src: "/projects/database-inventory-service/dashboard.png",
        alt: "Demo dashboard showing five sample databases by platform, OS family and RAM usage, with expiry alerts — all fictional sample data",
      },
      {
        src: "/projects/database-inventory-service/database-detail.png",
        alt: "Demo detail page for a single sample database, showing metadata, lifecycle dates, resource usage and version history — all fictional sample data",
      },
    ],
  },
  {
    slug: "voice-signal-throat-cancer",
    badge: "Final-year thesis",
    learned:
      "Hand-engineered acoustic features carry meaning a clinician can actually read. A learned representation might score better and explain nothing — and that trade is a real decision, not a detail.",
    title: "Voice Signal Analysis for Throat Cancer Detection",
    kind: "thesis",
    year: 2026,
    period: "2025–2026",
    stack: ["Python", "MFCC · Jitter · Shimmer · HNR", "CNN-LSTM"],
    headline: "Teaching a model to listen for what a clinician listens for.",
    summary:
      "Undergraduate thesis: acoustic features of the voice as an early signal for laryngeal pathology.",
    body: [
      "Disease in the larynx changes the voice before it changes much else, and it changes it in ways that are measurable rather than merely audible. The thesis asks how far that signal can be pushed with machine learning.",
      "The work extracts a set of acoustic features — MFCCs, Jitter, Shimmer, Harmonics-to-Noise Ratio, and the Mel spectrogram — from recordings in the Saarbrücken Voice Database, and feeds them to two families of model: classical classifiers over the engineered features, and a CNN-LSTM hybrid that reads the spectrogram directly. The comparison is the point. Hand-engineered acoustic measures carry real clinical meaning; a learned representation may carry more, but it carries it opaquely.",
      "Supervised at AIUB as the final-year thesis for the BSc in Computer Science & Engineering.",
    ],
    contributions: [
      "Feature extraction pipeline over the Saarbrücken Voice Database",
      "Classical baselines over engineered acoustic features",
      "CNN-LSTM hybrid reading Mel spectrograms directly",
      "Comparative evaluation across both model families",
    ],
    status: "Thesis, 2026",
  },
  {
    slug: "agile-implementation-bangladesh",
    badge: "Co-authored paper",
    learned:
      "Writing to a strict format forces you to defend every claim you make. That turned out to be much harder than having the idea.",
    title: "Beyond Methodology Selection",
    kind: "paper",
    year: 2025,
    period: "2025",
    stack: ["IEEE format", "Qualitative analysis"],
    headline: "Adopting Agile is easy. Staying Agile six months later is the actual problem.",
    summary:
      "Co-authored paper on why Agile adoption in the Bangladeshi software industry stalls after the methodology is chosen.",
    body: [
      "Teams adopt Agile and then find that adopting it was the easy part. The paper argues that the interesting failures are not in methodology selection but in everything downstream of it — the organisational and contextual conditions that decide whether the chosen process survives contact with the work.",
      "A systematic gap analysis of Agile implementation in the Bangladeshi software industry, followed by a contextual framework for reasoning about those gaps. Written and formatted to IEEE conference standards.",
      "Co-authored.",
    ],
    status: "Co-authored, IEEE format",
  },
  {
    slug: "ans-hospital-management",
    badge: "University project",
    learned:
      "Normalising the schema before writing any PHP made every query afterwards simpler. I learned this by doing it in the wrong order first and rewriting.",
    title: "ANS Hospital Management System",
    kind: "academic",
    year: 2025,
    period: "2025",
    stack: ["PHP", "MySQL", "HTML", "CSS"],
    headline: "One schema behind registration, scheduling and billing — built in that order for a reason.",
    summary:
      "Full-stack hospital system: registration, scheduling and billing over a normalised relational schema.",
    body: [
      "A web-based system automating the operational core of a hospital — patient registration, appointment scheduling, and billing — built as a full-stack academic project.",
      "The database design carried most of the weight. A normalised relational schema removed the duplication that a flat design invites, which both reduced redundancy and made queries measurably cheaper. On top of that sits role-based access separating Admin, Doctor and Staff, so that the workflow and the security model are the same model rather than two that have to be kept in agreement.",
    ],
    contributions: [
      "Normalised relational schema design",
      "Role-based access control across Admin, Doctor and Staff",
      "Registration, scheduling and billing modules",
      "Test planning and test case documentation across group projects, including MediTrackBD and a sign language translation project",
    ],
    status: "Academic project",
  },
  {
    slug: "anime-ratings-analysis",
    badge: "University project",
    learned:
      "The model came back with a negative R² — worse than just predicting the average rating for every title. That was the honest finding: rank and release year barely explain how an anime actually gets rated, and no amount of retuning the regression was going to fix a feature set that was missing the point.",
    title: "Anime Ratings Predictive Analysis",
    kind: "data",
    year: 2026,
    period: "2025–2026",
    stack: ["R", "rvest", "Linear regression"],
    headline: "The model believed the ratings more than they deserved — until the numbers said otherwise.",
    summary:
      "Group project for AIUB's Data Science course: scrape MyAnimeList, model rating from rank and year, and find out the obvious predictors barely explain anything.",
    body: [
      "A four-person group project for AIUB's Introduction to Data Science course: scrape the top 50 titles from MyAnimeList's \"Top Anime by Popularity\" page with R and the rvest library, clean what comes back, and test whether an anime's popularity rank and release year predict its user rating.",
      "Rank, year and a derived age-in-years feature went into a linear regression trained on 70% of the data and tested on the rest. The result was a negative R² on the held-out set — the model did worse than simply guessing the average rating every time. Popularity and recency turned out to explain almost nothing about how an anime is actually rated.",
    ],
    status: "Group coursework, submitted January 2026",
    repoUrl: "https://github.com/islamtanvir42/Web-scraping-",
    files: [
      { label: "Report (PDF)", href: "/projects/anime-ratings-analysis/anime-ratings-report.pdf" },
      { label: "R script", href: "/projects/anime-ratings-analysis/anime_rating_analysis.R" },
    ],
    code: {
      language: "R",
      source: `# ============================================================
# Introduction to Data Science: Final Term Project (Web Scraping)
# Top 50 Anime by Popularity (MyAnimeList) - Rating Analysis
# ============================================================


# 1. Importing libraries first ------------------------------------------

## install.packages("rvest")
## install.packages("dplyr")
## install.packages("stringr")
## install.packages("ggplot2")
## install.packages("lubridate")
## install.packages("agricolae")
## install.packages("reshape2")
library(ggplot2)
library(rvest)
library(dplyr)
library(stringr)
library(lubridate)
library(agricolae)
library(reshape2)


# 2. Data Collection (Web Scraping) -------------------------------------

## Finding URL and Reading the HTMLs
url <- "https://myanimelist.net/topanime.php?type=bypopularity"
url

webpage <- read_html(url)
webpage

## Extracting the Elements

### Titles of the Anime
titles_raw <- webpage %>%
  html_elements("h3.anime_ranking_h3") %>%
  html_text2()
titles <- trimws(titles_raw)
titles

### Years of the Anime
years_raw <- webpage %>%
  html_elements("div.information.di-ib.mt4") %>%
  html_text2()
years <- str_extract(years_raw, "\\\\d{4}")
years
years <- as.integer(years)
years

### Ratings of the Anime
ratings_raw <- webpage %>%
  html_elements("div.js-top-ranking-score-col.top-ranking-score-col.di-ib.al") %>%
  html_text2()
ratings <- as.numeric(ratings_raw)
ratings

## Creating the Data Frame
animes_df <- data.frame(
  Rank = 1:50,
  Titles = titles,
  Year = years,
  Rating = ratings
)

head(animes_df)


# 3. Data Understanding and Exploration ---------------------------------

## Summary statistics
summary(animes_df)

## Checking for missing values
colSums(is.na(animes_df))

## Exploratory Data Analysis (EDA)

### Distribution of Ratings
ggplot(animes_df, aes(x = Rating)) +
  geom_histogram(binwidth = 0.1, fill = "skyblue", color = "black") +
  labs(title = "Distribution of Anime Ratings", x = "Rating", y = "Count")

### Distribution of Years
ggplot(animes_df, aes(x = Year)) +
  geom_histogram(binwidth = 1, fill = "lightgreen", color = "black") +
  labs(title = "Distribution of Anime Release Years", x = "Year", y = "Count")

### Ratings vs. Year (Scatter Plot)
ggplot(animes_df, aes(x = Year, y = Rating)) +
  geom_point() +
  geom_smooth(method = "lm", se = FALSE, color = "blue") +
  labs(title = paste("Rating vs Year (r =",
                     round(cor(animes_df$Year, animes_df$Rating), 2), ")"),
       x = "Year", y = "Rating")

### Detecting Outliers (using Box Plot)
ggplot(animes_df, aes(y = Rating)) +
  geom_boxplot(fill = "orange") +
  labs(title = "Boxplot of Anime Ratings", y = "Rating")


# 4. Data Pre-Processing ------------------------------------------------

## Checking if there's any Missing Data
colSums(is.na(animes_df))

## Checking how old the Anime is
current_year <- as.integer(format(Sys.Date(), "%Y"))
animes_df$Anime_Age_in_Years <- (current_year - animes_df$Year)
animes_df

## Excluding the Title for Feature Selection (For Numeric Analysis)
animes_numeric_df <- animes_df
animes_numeric_df$Titles <- NULL
animes_numeric_df

## Encoding Categorical Variable
animes_df$Titles <- as.factor(animes_df$Titles)
animes_df

## Applying Min-Max Normalization
animes_scaled <- as.data.frame(scale(animes_numeric_df))
animes_scaled

head(animes_scaled)


# 5. Modelling and Analysis ---------------------------------------------

## Data used for modelling
model_data <- animes_numeric_df

## Check correlation between variables
cor_matrix <- cor(model_data)
cor_matrix

## Visualize correlations
melted_cor <- melt(cor_matrix)
ggplot(melted_cor, aes(Var1, Var2, fill = value)) +
  geom_tile() +
  scale_fill_gradient2(low = "lightblue", high = "violetred", mid = "white", midpoint = 0) +
  geom_text(aes(label = round(value, 2)), size = 4) +
  labs(title = "Correlation Matrix of Numeric Variables", x = "", y = "") +
  theme_minimal()

### Linear Regression (Predict Rating)

#### Split data into training (70%) and testing (30%) sets
set.seed(123)
train_index <- sample(1:nrow(model_data), 0.7 * nrow(model_data))
train_data <- model_data[train_index, ]
test_data <- model_data[-train_index, ]

#### Predicting Rating based on Rank, Year, and Anime_Age_in_Years
lm_model <- lm(Rating ~ ., data = train_data)
lm_model
summary(lm_model)

#### Make predictions on test set
predictions <- predict(lm_model, newdata = test_data)

#### Calculate performance metrics
actual <- test_data$Rating
actual

#### Mean Absolute Error (MAE)
mae <- mean(abs(predictions - actual))
mae

#### Root Mean Squared Error (RMSE)
rmse <- sqrt(mean((predictions - actual)^2))
rmse

#### R-squared (on test data)
ss_res <- sum((actual - predictions)^2)
ss_res
ss_tot <- sum((actual - mean(actual))^2)
ss_tot
r_squared_test <- 1 - (ss_res / ss_tot)
r_squared_test

#### Visualize predictions vs actual
results_df <- data.frame(
  Actual = actual,
  Predicted = predictions,
  ID = 1:length(actual)
)
results_df

ggplot(results_df, aes(x = Actual, y = Predicted)) +
  geom_point(color = "blue", size = 3, alpha = 0.7) +
  geom_abline(slope = 1, intercept = 0, color = "red", linetype = "dashed") +
  labs(
    title = "Linear Regression: Actual vs Predicted Ratings",
    subtitle = "Red line represents perfect predictions",
    x = "Actual Rating",
    y = "Predicted Rating"
  ) +
  theme_minimal()
`,
    },
  },
];

export const education = [
  {
    qualification: "BSc in Computer Science & Engineering",
    detail: "Information Systems concentration",
    institution: "American International University-Bangladesh (AIUB)",
    // "(expected)" dropped at the client's request — the coursework is done.
    // The reviewed alternative was "2022 – 2026 · Coursework complete", but the
    // Journey rail on the homepage is a fixed 150px column and that string
    // wraps to two lines in it. The plain range needs no layout concession.
    period: "2022 – 2026",
  },
  {
    qualification: "Higher Secondary Certificate",
    detail: "Science",
    institution: "Shaheed Police Smrity College, Mirpur, Dhaka",
    period: "2020",
  },
  {
    qualification: "Secondary School Certificate",
    detail: "Science",
    institution: "Model Academy, Mirpur, Dhaka",
    period: "2018",
  },
];

export const skills = [
  { group: "Databases", items: ["PostgreSQL", "MySQL", "Oracle", "SQL"] },
  { group: "Programming", items: ["Python", "Java", "C++", "PHP", "R"] },
  { group: "Web & API", items: ["FastAPI", "React", "HTML", "CSS"] },
  {
    group: "Practice",
    items: [
      "Normalised schema design",
      "Role-based access control",
      "Test planning & documentation",
    ],
  },
  { group: "Tools", items: ["VS Code", "Framer", "MS Excel", "MS PowerPoint"] },
];

export const interests = [
  "Database administration and systems reliability",
  "Applied machine learning",
  "Data science and analysis",
];

export const languages = [
  { name: "Bangla", level: "Native" },
  { name: "English", level: "Proficient — reading, writing and speaking" },
];

export const experience = [
  {
    role: "Database Administration Intern",
    org: "UCBL",
    period: "2026 — present",
    note: "Hands-on work with production database environments in a regulated banking context. Currently building an internal database inventory service.",
  },
];
