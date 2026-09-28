# ============================================================
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
years <- str_extract(years_raw, "\\d{4}")
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
## (note: scale() actually performs z-score standardization, as in the original)
animes_scaled <- as.data.frame(scale(animes_numeric_df))
animes_scaled

head(animes_scaled)


# 5. Modelling and Analysis ---------------------------------------------

## Data used for modelling
## (this line is not shown in the PDF; the regression output matches the
##  unscaled numeric data, so animes_numeric_df is used here)
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
