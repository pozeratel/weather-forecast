import {
  HeroSection,
  HeroContent,
  HeroTitle,
  HeroText,
  HeroDetails,
  WeatherSummary,
  SummaryDate,
  SummaryTemperature,
  SearchForm,
  SearchInput,
  SearchButton,
} from "./Hero.styled";
import { PageContainer } from "../PageContainer/PageContainer.styled";

export const Hero = ({ searchTerm, setSearchTerm, onSearch, locationWeather }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  const formattedDate = locationWeather?.dt
    ? new Intl.DateTimeFormat("en-US", {
        month: "long",
        year: "numeric",
      }).format(new Date(locationWeather.dt * 1000))
    : new Intl.DateTimeFormat("en-US", {
        month: "long",
        year: "numeric",
      }).format(new Date());

  const temperature = locationWeather?.main?.temp
    ? `${Math.round(locationWeather.main.temp)}°`
    : "--";

  return (
    <HeroSection>
      <PageContainer>
        <HeroContent>
          <HeroTitle>Weather dashboard</HeroTitle>
          <HeroDetails>
            <HeroText>
              Create your personal list of favorite cities and always be aware of the weather.
            </HeroText>
            <WeatherSummary>
              <SummaryDate>{formattedDate}</SummaryDate>
              <SummaryTemperature>Today: {temperature}</SummaryTemperature>
            </WeatherSummary>
          </HeroDetails>

          <SearchForm onSubmit={handleSubmit}>
            <SearchInput
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search location..."
            />
            <SearchButton type="submit" aria-label="Search" />
          </SearchForm>
        </HeroContent>
      </PageContainer>
    </HeroSection>
  );
};
