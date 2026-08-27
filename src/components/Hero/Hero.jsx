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

export const Hero = ({ searchTerm, setSearchTerm, onSearch }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

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
              <SummaryDate>October 2023</SummaryDate>
              <SummaryTemperature>Today: 17°</SummaryTemperature>
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
