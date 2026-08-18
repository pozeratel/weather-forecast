import {
  HeroSection,
  HeroContent,
  HeroBadge,
  HeroTitle,
  HeroText,
  SearchForm,
  SearchInput,
  SearchButton,
  HeroNote,
} from "./Hero.styled";

export const Hero = ({ searchTerm, setSearchTerm, onSearch }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <HeroSection>
      <HeroContent>
        <HeroBadge>New season is available</HeroBadge>
        <HeroTitle>Weather dashboard</HeroTitle>
        <HeroText>
          Create your personal list of favorite cities and always be aware of the weather.
        </HeroText>

        <SearchForm onSubmit={handleSubmit}>
          <SearchInput
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search location..."
          />
          <SearchButton type="submit" aria-label="Search" />
        </SearchForm>

        <HeroNote>Track your favorites in one clear place.</HeroNote>
      </HeroContent>
    </HeroSection>
  );
};
