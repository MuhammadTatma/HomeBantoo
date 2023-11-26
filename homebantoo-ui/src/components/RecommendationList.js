
import { Box, Heading, Card, Image, Stack, CardBody, Text, Tag } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useGetInventory } from "../hooks/useGetInventory";
import { daysUntillExpired} from '../utils/utils'
import { getDocs, query, collection, orderBy } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import { useGetUserInfo } from "../hooks/useGetUserInfo";

export function RecommendationList() {
  const [recommendation, setRecommendation] = useState([])
  const { userID, preferences } = useGetUserInfo()
  
  


  const APP_ID = 'c7f5bf4a';
  const APP_KEY = '1dbbb43c492661ea75968f3b0d4baccc';
  const dietLabels = ['low-carb', 'low-fat', 'high-protein'];
  const healthLabels = ['no-oil-added', 'vegan', 'low-sugar'];
  const getRecipesByInventory = async () => {

    let prefQuery = '';
    
    const keys = Object.keys(preferences);
    keys.forEach((key, index) => {
      if(preferences[key]){
        const prefToAdd = dietLabels.includes(key) ? `&diet=${key}` : `&health=${key}`;
        prefQuery += prefToAdd
      }
    })
    console.log(prefQuery);
    try{
      const inventoryCollectionRef = collection(db, 'users', userID, 'inventory')
      const queryInventory = query(inventoryCollectionRef, orderBy('expired'));
      const querySnapshot = await getDocs(queryInventory);
      let queryRecommendation = '';
      querySnapshot.forEach((doc) => {
        queryRecommendation = queryRecommendation + `${doc.data().name}, `
      });
      
      console.log('query : '+ queryRecommendation);
      const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${queryRecommendation}&app_id=${APP_ID}&app_key=${APP_KEY}${prefQuery !== ''? prefQuery:''}`)
      const data = await response.json()
      setRecommendation(data.hits);
      console.log(data);
    }catch(e){
      alert(e.message);
    }
  }
  // console.log(q);
  useEffect(() => {
    getRecipesByInventory();
    console.log('pp' + recommendation);
  }, []);

  const usedPreferenceLabel = ["Low-Carb", "High-Protein", "Low-Fat", "Low-Sugar", "No oil added", "Vegan"]


  const labelSorter = (a, b) => {  

    if(preferences[a.toLowerCase()])return -1;
    if(preferences[b.toLowerCase()])return 1;
    return usedPreferenceLabel.includes(a) ? -1 : 1;
  }

  return (
    <Box flex={1}>
      <Heading py={3} fontSize='xl'>Recipe Recommendation</Heading>
      <Box h={'78vh'} overflow={'scroll'}>
        {recommendation.length <=0 ? 'No Recommendation Yet':recommendation.map((recipe)=>{
          return(
            <Card  key={recipe.recipe.url} mb={2} direction={{ base: 'column', sm: 'row' }} overflow='hidden' variant='outline'>
              <Image boxSize='140px' objectFit='cover' maxW={{ base: '100%', sm: '200px' }} src={recipe.recipe.image} alt={recipe.recipe.label} />
              <Stack>
                <CardBody py={2} textAlign='start'>
                  <Heading rel="noreferrer noopener" target="_blank" href={recipe.recipe.url} as={'a'} _hover={{ textDecoration: 'underline', cursor: 'pointer' }} pb={1} fontSize='md'>{recipe.recipe.label}</Heading>
                  <Text fontSize='sm' pb={0}>Cuisine Type : {recipe.recipe.cuisineType}</Text>
                  <Text fontSize='sm' pb={1}>Calories: {recipe.recipe.calories.toFixed(2)} Cal</Text>
                  { recipe.recipe.dietLabels.concat(recipe.recipe.healthLabels).sort(labelSorter).slice(0,6).map( (label) => {
                    return  <Tag mx={1} size={'sm'} colorScheme='teal'>{label}</Tag>
                  } ) }
                  

                </CardBody>
              </Stack>
            </Card>
          )
        })}
        
      </Box>
    </Box>
  )
}