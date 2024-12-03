'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';


export default function Home() {
  const router = useRouter();
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [inputQuery, setInputQuery] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState(''); // Store current user
  const [showSaved, setShowSaved] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const [ingredients, setIngredients] = useState([
    "Tomato", "Carrot", "Beef", "Chicken", "Onions", "Garlic", "Peppers", "Potatoes"
  ]);

  const topFiveRecipes =  [
    {
      "label": "Smashed Tomato Pasta",
      "image": "https://edamam-product-images.s3.amazonaws.com/web-img/6a7/6a73d719d39525995ddf8f3b03974654.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDIaCXVzLWVhc3QtMSJHMEUCIQCl5xhACPjubhcYR6%2FIND4V2ikp6NC1cZUL4KkTwLcM4wIgXhAUXgY68mI1qJrw%2FCCnIdZEIottKFSSLZhVbfIb8DAqwgUI2v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDHP7x1Q92O0qCs5S%2BiqWBY%2BoZSLerK%2BBSVb9WAgw4psAXJTHAIf3bzefbuOp%2FRjr3PeR5VyzxnIYu9RE%2F0jbN4Uj1xjBflh9%2BllMUiBg9QvRxdtURNG5auZzex7NHA87ThnebzPmhZqWdFpYdaRwK5HSZR0TdF%2B%2Fh24D56IeOgw6FiANluN34ilHPFGzl4LGqGmsxNZu%2B4mggF8Coc3mFpjor3mgZSWwbC4U4Ki4T1G7KFUMPhET3%2BRPK9Ee42mU9Q0RWVtxq%2FJkUxoZMbu1BDPp2KtW3pYGOt5xTYjYsoSLiuq4CKCY9lmv2MdBp9D%2Fm%2BxP6QzdsIfg96L%2BECvqQurmk%2FS%2F14v%2FhjueWEjrQCAPZcgkG5rj39hzz0zgqxFBAbn%2BMYM2QTC8AmbGfPoEd65UWb4YVsi1LMP%2B9GIXYBaRo%2FpwvUo7l%2BbvuMN%2BL53qRAVrr%2Bs3tzmbubtm5CN5ApnWSPaRO8glBn35LY7ds9WeOcV3GJ%2F1BbM7sDmDBjPu3z4avzdxGtYsD6pOugp7CCMWAolsoGuN3NI7OsVyS7pBFs1DHgSFBZWlnE3eYSokQxStqxsGrsNxOImQOQioXLkN3dUKVeqA4VETyhwd%2B02ph4jwOuBbYr%2FLlTv%2B5ezzOQPw5eECqlJMKmedicsm0WXqkUQJj7HbmESkP05CFyCZVxTT%2F%2FYAXs54u2Q1M%2F2DDnSowLgbqODwUkjZqFWh6nJHOTkK%2Bv0CkpgdxxafqXiy19uSn%2FoAR2Y%2Bl87U2nMgRo2JPTUIyryqysWOKsNPKSs7jrwqQ4bhsmmRWwjXTS%2BPXilngAQTaoZt0bGOFA%2BybMrVEyyLBTsrQMdaWvYObXVHjwm5%2Bl89kNmsQ9iLLq5NEHqfJ5awhvESGUL%2Fr%2BidXQGc0i60MNj6vLoGOrEBVfaIIrUPcLg63CLZcuKzuZusO2IHSst5ZIVHT1NbilUt5RkIE6YOWDhZI2a5HS%2Fqeyu0Dw1v9s8XWs2%2FNJM%2BUZE8ZgR5D4oJ3h2HHWOtPg4XORAVsLSVGUtCR9AQRyXwcSUHZJcmbIoVhSiXT%2BNeHHvNUdG7rRC3FyJ2E1JIyB8Tib7pwBYaTgK%2FOunxme93JjFrFEea5M%2BXOK8erY8zo8YG5b0UmVwfN8HEJ%2BtwGLZK&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20241203T185629Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFIIYBY74J%2F20241203%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=ccbefadf44905809f69d31dd9fb572fdc85cc4cf45f36ae1269b3e154cb78994",
      "source": "Simply Recipes",
      "url": "https://www.simplyrecipes.com/smashed-tomato-pasta-recipe-5498706",
      "calories": 2764.3594059207867
    },
    {
      "label": "Teriyaki Salmon",
      "image": "https://edamam-product-images.s3.amazonaws.com/web-img/172/1726685f6438d728d457e5d4ee24c36f.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDMaCXVzLWVhc3QtMSJGMEQCICn%2BeEduW%2BmDaVSfqqA6IXMjS50xlP1I0QPAcXXrQkD0AiBdS%2BUX3B3gMuVAtdEOR2%2BR0jqWms2ol1xtUn0bJtNTMyrCBQjb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDE4NzAxNzE1MDk4NiIMzYfHJ07wB0yJ306pKpYFuNG2tkXsNyLBWw8TH2FYqYellIMg3Tgq%2BVBK0fDgLq3H8WsevBV0pOrt5xs6Ct30fjdwZeWUN3STh6AYth5TV9NqdVX2F6maP6iG0EjrffFuRMbrq6KDYCsi9lHKKevc4Hy4GgUcK9fQKxTn51L3m%2FJqquWIdyBNEtjk9XAifB8fKunScr7AdQjjtS31nwZJ9YgBJ6aVfT8Lq9T0VvZf%2FA09miyw6pPiU5hpMO0By0sBGu5WRbo3ixnHqHq%2Fecl2TgkNzzwHeIA2meLSzdjzlYxFTXat3zo5GgNNSO9hrd4troB66xIP8fTGtadh1sYA80bPnkjN772wZhoGFhV4odaeiQrZvztRGaYN8SBdjhDbejpMJTJlt2IVv4Ffk7vJD03Bf88unQEz5AZZWbhIsssKIch%2BmG9IuWQT1qY7Vrqw9wee7JSXD70P3XUrRsoQ%2FDuM03NEesYzRvm6j79V1Z5PJC4WHKME%2Fybfxrq5KtQT4oJQSJ4fmgLZH5doSv%2FxF3zA3f4Bp1YGrY6iLJeK6QvwOcOt81G3vH%2FU30UHm2sj1qoRAp2IC63%2Fb%2F%2Fs4GwTN1oGEtd%2BQYc85H426YudYMDvSd2M%2FM7BczI3soL5VbYp%2BxLhtbz%2BsWORC3bF5L4Jvx6fkrKB%2FQO4hqFZ4wSl8eoCnyOhsrXCSUQjOR8RXtqPiYd%2BFtqVZ27hBsE4R982KOxulFoB3%2FX8px%2Bw1SBHpVq1f6IylZX8J2jZsUuHE2EXh9FcqDfvHbvHfrlNTPI76SaGWcmDvLb3LRyWSxc9yTan7LUEv0j1mb0fjlmgrP0dDkGdXfVMuRc5PyaSfI82yLQ1uQod40vTu%2FZFQNH1lpsDLcHZgdVZrYmQhWaT6zizvC6qJmowyZC9ugY6sgFhh3PNOI2pLGU4knzeThS6WytjZHi9an81X0pok2eT%2BiY3CjCIBJMiRGu8uiSZlTtW%2Fytxkic8Sfh79h5uPab5XXR5h4SJRJWM3ESl2xZa82bPDn5bH8WIf8MAH2lbLDsJY6W9Oe%2B4nhi2Omh9zOjA%2Be8j%2BSNZJhhLhMaJ1LMHe1ymahZEpwmiWfsSE%2FGosMMxDt1umFP8xwtcktVA8IVD9PlYq5xI7FyqOvxA%2F4bpxuiL&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20241203T185707Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFCOROTYRY%2F20241203%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=1dffe8fc034fc1eb0384975c33bfe09e50ca6fb3db11e17b341849bb25a6982e",
      "source": "Bon Appetit",
      "url": "https://www.bonappetit.com/recipe/teriyaki-salmon",
      "calories": 1007.5521296000002
    },
    {
      "label": "Pumpkin Waffles",
      "image": "https://edamam-product-images.s3.amazonaws.com/web-img/dc8/dc8d6f2c22ca7e18642e9274b18e97b2.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDMaCXVzLWVhc3QtMSJGMEQCICn%2BeEduW%2BmDaVSfqqA6IXMjS50xlP1I0QPAcXXrQkD0AiBdS%2BUX3B3gMuVAtdEOR2%2BR0jqWms2ol1xtUn0bJtNTMyrCBQjb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDE4NzAxNzE1MDk4NiIMzYfHJ07wB0yJ306pKpYFuNG2tkXsNyLBWw8TH2FYqYellIMg3Tgq%2BVBK0fDgLq3H8WsevBV0pOrt5xs6Ct30fjdwZeWUN3STh6AYth5TV9NqdVX2F6maP6iG0EjrffFuRMbrq6KDYCsi9lHKKevc4Hy4GgUcK9fQKxTn51L3m%2FJqquWIdyBNEtjk9XAifB8fKunScr7AdQjjtS31nwZJ9YgBJ6aVfT8Lq9T0VvZf%2FA09miyw6pPiU5hpMO0By0sBGu5WRbo3ixnHqHq%2Fecl2TgkNzzwHeIA2meLSzdjzlYxFTXat3zo5GgNNSO9hrd4troB66xIP8fTGtadh1sYA80bPnkjN772wZhoGFhV4odaeiQrZvztRGaYN8SBdjhDbejpMJTJlt2IVv4Ffk7vJD03Bf88unQEz5AZZWbhIsssKIch%2BmG9IuWQT1qY7Vrqw9wee7JSXD70P3XUrRsoQ%2FDuM03NEesYzRvm6j79V1Z5PJC4WHKME%2Fybfxrq5KtQT4oJQSJ4fmgLZH5doSv%2FxF3zA3f4Bp1YGrY6iLJeK6QvwOcOt81G3vH%2FU30UHm2sj1qoRAp2IC63%2Fb%2F%2Fs4GwTN1oGEtd%2BQYc85H426YudYMDvSd2M%2FM7BczI3soL5VbYp%2BxLhtbz%2BsWORC3bF5L4Jvx6fkrKB%2FQO4hqFZ4wSl8eoCnyOhsrXCSUQjOR8RXtqPiYd%2BFtqVZ27hBsE4R982KOxulFoB3%2FX8px%2Bw1SBHpVq1f6IylZX8J2jZsUuHE2EXh9FcqDfvHbvHfrlNTPI76SaGWcmDvLb3LRyWSxc9yTan7LUEv0j1mb0fjlmgrP0dDkGdXfVMuRc5PyaSfI82yLQ1uQod40vTu%2FZFQNH1lpsDLcHZgdVZrYmQhWaT6zizvC6qJmowyZC9ugY6sgFhh3PNOI2pLGU4knzeThS6WytjZHi9an81X0pok2eT%2BiY3CjCIBJMiRGu8uiSZlTtW%2Fytxkic8Sfh79h5uPab5XXR5h4SJRJWM3ESl2xZa82bPDn5bH8WIf8MAH2lbLDsJY6W9Oe%2B4nhi2Omh9zOjA%2Be8j%2BSNZJhhLhMaJ1LMHe1ymahZEpwmiWfsSE%2FGosMMxDt1umFP8xwtcktVA8IVD9PlYq5xI7FyqOvxA%2F4bpxuiL&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20241203T185723Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFCOROTYRY%2F20241203%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=4dd642eaaa5fe6bfd7ed8ff7ffd6ae97bc8908f426dc3147809083285baaa20c",
      "source": "Smitten Kitchen",
      "url": "http://smittenkitchen.com/2007/11/pumpkin-waffles/",
      "calories": 2721.3944285333328
    },
    {
      "label": "Sushi Rice Bowl",
      "image": "https://edamam-product-images.s3.amazonaws.com/web-img/9d1/9d1d6b4c5f4d2c9c04a61101466d3f7b.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDMaCXVzLWVhc3QtMSJGMEQCICn%2BeEduW%2BmDaVSfqqA6IXMjS50xlP1I0QPAcXXrQkD0AiBdS%2BUX3B3gMuVAtdEOR2%2BR0jqWms2ol1xtUn0bJtNTMyrCBQjb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDE4NzAxNzE1MDk4NiIMzYfHJ07wB0yJ306pKpYFuNG2tkXsNyLBWw8TH2FYqYellIMg3Tgq%2BVBK0fDgLq3H8WsevBV0pOrt5xs6Ct30fjdwZeWUN3STh6AYth5TV9NqdVX2F6maP6iG0EjrffFuRMbrq6KDYCsi9lHKKevc4Hy4GgUcK9fQKxTn51L3m%2FJqquWIdyBNEtjk9XAifB8fKunScr7AdQjjtS31nwZJ9YgBJ6aVfT8Lq9T0VvZf%2FA09miyw6pPiU5hpMO0By0sBGu5WRbo3ixnHqHq%2Fecl2TgkNzzwHeIA2meLSzdjzlYxFTXat3zo5GgNNSO9hrd4troB66xIP8fTGtadh1sYA80bPnkjN772wZhoGFhV4odaeiQrZvztRGaYN8SBdjhDbejpMJTJlt2IVv4Ffk7vJD03Bf88unQEz5AZZWbhIsssKIch%2BmG9IuWQT1qY7Vrqw9wee7JSXD70P3XUrRsoQ%2FDuM03NEesYzRvm6j79V1Z5PJC4WHKME%2Fybfxrq5KtQT4oJQSJ4fmgLZH5doSv%2FxF3zA3f4Bp1YGrY6iLJeK6QvwOcOt81G3vH%2FU30UHm2sj1qoRAp2IC63%2Fb%2F%2Fs4GwTN1oGEtd%2BQYc85H426YudYMDvSd2M%2FM7BczI3soL5VbYp%2BxLhtbz%2BsWORC3bF5L4Jvx6fkrKB%2FQO4hqFZ4wSl8eoCnyOhsrXCSUQjOR8RXtqPiYd%2BFtqVZ27hBsE4R982KOxulFoB3%2FX8px%2Bw1SBHpVq1f6IylZX8J2jZsUuHE2EXh9FcqDfvHbvHfrlNTPI76SaGWcmDvLb3LRyWSxc9yTan7LUEv0j1mb0fjlmgrP0dDkGdXfVMuRc5PyaSfI82yLQ1uQod40vTu%2FZFQNH1lpsDLcHZgdVZrYmQhWaT6zizvC6qJmowyZC9ugY6sgFhh3PNOI2pLGU4knzeThS6WytjZHi9an81X0pok2eT%2BiY3CjCIBJMiRGu8uiSZlTtW%2Fytxkic8Sfh79h5uPab5XXR5h4SJRJWM3ESl2xZa82bPDn5bH8WIf8MAH2lbLDsJY6W9Oe%2B4nhi2Omh9zOjA%2Be8j%2BSNZJhhLhMaJ1LMHe1ymahZEpwmiWfsSE%2FGosMMxDt1umFP8xwtcktVA8IVD9PlYq5xI7FyqOvxA%2F4bpxuiL&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20241203T185740Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFCOROTYRY%2F20241203%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=f73e1c82f0ae6c4910baac2c407853a0179a4e02aa2121023a0059e8956d78c7",
      "source": "Honest Cooking",
      "url": "https://honestcooking.com/sushi-rice-bowl/",
      "calories": 247.92784165000003
    },
    {
      "label": "Ratatouille",
      "image": "https://edamam-product-images.s3.amazonaws.com/web-img/a4d/a4d17ce0fd69046ab867c756afcabd54.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDMaCXVzLWVhc3QtMSJGMEQCICn%2BeEduW%2BmDaVSfqqA6IXMjS50xlP1I0QPAcXXrQkD0AiBdS%2BUX3B3gMuVAtdEOR2%2BR0jqWms2ol1xtUn0bJtNTMyrCBQjb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDE4NzAxNzE1MDk4NiIMzYfHJ07wB0yJ306pKpYFuNG2tkXsNyLBWw8TH2FYqYellIMg3Tgq%2BVBK0fDgLq3H8WsevBV0pOrt5xs6Ct30fjdwZeWUN3STh6AYth5TV9NqdVX2F6maP6iG0EjrffFuRMbrq6KDYCsi9lHKKevc4Hy4GgUcK9fQKxTn51L3m%2FJqquWIdyBNEtjk9XAifB8fKunScr7AdQjjtS31nwZJ9YgBJ6aVfT8Lq9T0VvZf%2FA09miyw6pPiU5hpMO0By0sBGu5WRbo3ixnHqHq%2Fecl2TgkNzzwHeIA2meLSzdjzlYxFTXat3zo5GgNNSO9hrd4troB66xIP8fTGtadh1sYA80bPnkjN772wZhoGFhV4odaeiQrZvztRGaYN8SBdjhDbejpMJTJlt2IVv4Ffk7vJD03Bf88unQEz5AZZWbhIsssKIch%2BmG9IuWQT1qY7Vrqw9wee7JSXD70P3XUrRsoQ%2FDuM03NEesYzRvm6j79V1Z5PJC4WHKME%2Fybfxrq5KtQT4oJQSJ4fmgLZH5doSv%2FxF3zA3f4Bp1YGrY6iLJeK6QvwOcOt81G3vH%2FU30UHm2sj1qoRAp2IC63%2Fb%2F%2Fs4GwTN1oGEtd%2BQYc85H426YudYMDvSd2M%2FM7BczI3soL5VbYp%2BxLhtbz%2BsWORC3bF5L4Jvx6fkrKB%2FQO4hqFZ4wSl8eoCnyOhsrXCSUQjOR8RXtqPiYd%2BFtqVZ27hBsE4R982KOxulFoB3%2FX8px%2Bw1SBHpVq1f6IylZX8J2jZsUuHE2EXh9FcqDfvHbvHfrlNTPI76SaGWcmDvLb3LRyWSxc9yTan7LUEv0j1mb0fjlmgrP0dDkGdXfVMuRc5PyaSfI82yLQ1uQod40vTu%2FZFQNH1lpsDLcHZgdVZrYmQhWaT6zizvC6qJmowyZC9ugY6sgFhh3PNOI2pLGU4knzeThS6WytjZHi9an81X0pok2eT%2BiY3CjCIBJMiRGu8uiSZlTtW%2Fytxkic8Sfh79h5uPab5XXR5h4SJRJWM3ESl2xZa82bPDn5bH8WIf8MAH2lbLDsJY6W9Oe%2B4nhi2Omh9zOjA%2Be8j%2BSNZJhhLhMaJ1LMHe1ymahZEpwmiWfsSE%2FGosMMxDt1umFP8xwtcktVA8IVD9PlYq5xI7FyqOvxA%2F4bpxuiL&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20241203T185807Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3599&X-Amz-Credential=ASIASXCYXIIFCOROTYRY%2F20241203%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=32802e217ed3d7d0dd2e49c45dae011a37b58994e400187974c8b793fe84181e",
      "source": "Bon Appetit",
      "url": "https://www.bonappetit.com/recipe/ratatouille-recipe",
      "calories": 1862.849313750004
    }
  ]

  const deleteRecipe = async (recipeLabel) => {
    try {
      const response = await fetch(`/api/recipes?label=${encodeURIComponent(recipeLabel)}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Update the local state to remove the deleted recipe
        setSavedRecipes(savedRecipes.filter(recipe => recipe.label !== recipeLabel));
        alert('Recipe removed successfully!');
      } else {
        alert('Failed to remove recipe');
      }
    } catch (error) {
      console.error('Error removing recipe:', error);
      alert('Error removing recipe');
    }
  };

  // Fetch user's saved recipes
  const fetchSavedRecipes = async () => {
    try {
      const response = await fetch('/api/recipes');
      if (response.ok) {
        const data = await response.json();
        setSavedRecipes(data.recipes || []);
        setUsername(data.username);
      }
    } catch (error) {
      console.error('Error fetching saved recipes:', error);
    }
  };

  useEffect(() => {
    fetchSavedRecipes();
  }, []);

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      let queryString = '';
      
      // Case 1: Using search bar
      if (searchQuery) {
        queryString = `q=${encodeURIComponent(searchQuery)}`;
      }
      // Case 2: Using ingredient selection
      else if (selectedIngredients.length > 0) {
        const combinedIngredients = selectedIngredients
          .map(ing => ing.toLowerCase())
          .join(' ');
        queryString = `q=${encodeURIComponent(combinedIngredients)}`;
      }
      
      console.log('Query String:', queryString);
      
      const response = await fetch(`/api/meal?${queryString}`);
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      
      const data = await response.json();
      if (data.hits) {
        setRecipes(data.hits);
      } else {
        setRecipes([]);
      }
    } catch (error) {
      console.error('Error:', error);
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };
  
  // Update useEffect to trigger search when either searchQuery or selectedIngredients change
  useEffect(() => {
    if (searchQuery || selectedIngredients.length > 0) {
      fetchRecipes();
      setHasSearched(true);
    }
  }, [searchQuery, selectedIngredients]);

  const handleSearch = () => {
    setSelectedIngredients([]); // Clear ingredient selections
    setSearchQuery(inputQuery);
    setShowSaved(false);
  };

  const handleLogout = () => {
    router.push('/'); // Redirect to main page
  };

  const saveRecipe = async (recipe) => {
    try {
      const response = await fetch('/api/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipe: {
            label: recipe.recipe.label,
            image: recipe.recipe.image,
            source: recipe.recipe.source,
            url: recipe.recipe.url,
            calories: recipe.recipe.calories,
          }
        }),
      });

      if (response.ok) {
        await fetchSavedRecipes();
        alert('Recipe saved successfully!');
      } else {
        alert('Failed to save recipe');
      }
    } catch (error) {
      console.error('Error saving recipe:', error);
      alert('Error saving recipe');
    }
  };

  const toggleIngredient = (ingredient) => {
    setSearchQuery(''); // Clear search query
    setInputQuery(''); // Clear search bar
    setSelectedIngredients((prev) => {
      const newIngredients = prev.includes(ingredient)
        ? prev.filter((item) => item !== ingredient)
        : [...prev, ingredient];
      return newIngredients;
    });
  };

  const RecipeCard = ({ recipe, isSaved, onSave, onDelete }) => (
    <div className="border rounded-lg p-4 m-2 max-w-sm">
      <h3 className="font-bold text-lg mb-2">{recipe.label}</h3>
      <img 
        src={recipe.image} 
        alt={recipe.label} 
        className="w-full h-48 object-cover rounded mb-2"
      />
      <p className="text-gray-600 mb-2">{recipe.source}</p>
      <div className="flex gap-2">
        <a 
          href={recipe.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          View Recipe
        </a>
        {!isSaved && onSave && (
          <button
            onClick={onSave}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Save Recipe
          </button>
        )}
        {isSaved && onDelete && (
          <button
            onClick={onDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Remove
          </button>
        )}
      </div>
      <p className='mt-5 text-gray-600'>Calories: {recipe.calories.toFixed(2)}</p>
    </div>
  );
  
  return (
    <div>
      <nav className="bg-blue-600 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white text-xl font-bold">Recipe Manager</h1>
          <button
            onClick={() => router.push('/')}
            className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="mb-4">
        <h2 className="text-lg font-semibold">Filter by Ingredients</h2>
        <div className="flex flex-wrap gap-2">
          {ingredients.map((ingredient) => (
            <button
              key={ingredient}
              className={`px-4 py-2 rounded ${
                selectedIngredients.includes(ingredient)
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => toggleIngredient(ingredient)}
            >
              {ingredient}
            </button>
          ))}
        </div>
      </div>
  
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Recipe Search</h1>
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Search for a recipe"
              className="flex-1 p-2 border rounded"
            />
            <button 
              onClick={() => {
                setHasSearched(true);
                setSearchQuery(inputQuery);
                setShowSaved(false);
              }}
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            >
              Search
            </button>
            <button 
              onClick={() => setShowSaved(true)}
              className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
            >
              View Saved
            </button>
          </div>
        </div>
  
        {loading && <p className="text-center">Loading...</p>}
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {showSaved ? (
            savedRecipes.length > 0 ? (
              savedRecipes.map((recipe, index) => (
                <RecipeCard 
                  key={index} 
                  recipe={recipe} 
                  isSaved={true}
                  onDelete={() => deleteRecipe(recipe.label)}
                />
              ))
            ) : (
              <p>No saved recipes found</p>
            )
          ) : hasSearched ? (
            recipes.length > 0 ? (
              recipes.map((recipe, index) => (
                <RecipeCard 
                  key={index} 
                  recipe={recipe.recipe} 
                  isSaved={false}
                  onSave={() => saveRecipe(recipe)}
                />
              ))
            ) : (
              <p>No recipes found</p>
            )
          ) : (
            <>
              <div className="col-span-full mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Top 5 Recipes This Week</h2>
                <p className="text-gray-600 mt-2">Our most popular recipes that our users love!</p>
              </div>
              {topFiveRecipes.map((recipe, index) => (
                <RecipeCard 
                  key={index} 
                  recipe={recipe} 
                  isSaved={false}
                  onSave={() => saveRecipe({ recipe })}
                />
              ))}
            </>
          )}
        </div>
      </main>
    </div>
  );

}