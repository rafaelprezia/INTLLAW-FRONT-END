import styled from 'styled-components';
import SearchBar from '../Components/SearchBar.js';
import ConstitutionsImage from '../Images/Constitutions.png';
import ContractsImage from '../Images/Contracts.png';
import CriminalImage from '../Images/Criminal.png';
import DiplomacyImage from '../Images/Diplomacy.png';
import EnvironmentalImage from '../Images/Environmental.png';
import HumanRightsImage from '../Images/HumanRights.png';
import HumanitarianImage from '../Images/Humanitarian.png';
import ImmigrationImage from '../Images/Immigration.png';
import LabourImage from '../Images/Labour.png';
import MaritimeImage from '../Images/Maritime.png';
import Card from '../Components/Card.js';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #FFFFFF;
  height:70vh;
  width: 100vw;
  align-items: center;
`

const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #e6e6e6;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`

const RowsContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 70%;
  height: 90%;
  justify-content: space-between;
`

const Row = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: space-between;
`

function Home() {
    return (
      <HomeContainer>
        <SearchBar placeholder='What would you like to search for today? Type here or choose a category below.'/>
        <CardsContainer>
          <RowsContainer>
          <Row>
              <Card imageSrc={ConstitutionsImage} text={'Constitutions'}/>
              <Card imageSrc={CriminalImage} text={'Criminal'}/>
              <Card imageSrc={HumanitarianImage} text={'Humanitarian'}/>
              <Card imageSrc={DiplomacyImage} text={'Diplomacy'}/>
              <Card imageSrc={LabourImage} text={'Labour'}/>
            </Row>
            <Row>
              <Card imageSrc={HumanRightsImage} text={'Human Rights'}/>
              <Card imageSrc={EnvironmentalImage} text={'Environmental'}/>
              <Card imageSrc={MaritimeImage} text={'Maritime'}/>
              <Card imageSrc={ContractsImage} text={'Contracts'}/>
              <Card imageSrc={ImmigrationImage} text={'Immigration'}/>
            </Row>
          </RowsContainer>
        </CardsContainer>
      </HomeContainer>
    );
  }
  
  export default Home