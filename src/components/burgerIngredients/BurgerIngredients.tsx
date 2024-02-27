import styles from './BurgerIngredients.module.css'
import { useState, memo, useEffect, useRef } from "react"
import { Ingredient, Category } from '../../types/Types';

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"
import BurgerIngredient from '../inrgredient/Ingredient'

type BurgerIngredientsType = {
  ingredients: Array<Category>,
  setModalVisibility: React.Dispatch<React.SetStateAction<boolean>>,
  handleIngredient: (elem: Ingredient) => void,
  onChoose: (elem: Ingredient) => void
}

type SectionsRefType = {
  [key: string]: React.MutableRefObject<HTMLElement | null>
}

const BurgerIngredients = ({ ingredients, setModalVisibility, handleIngredient, onChoose }: BurgerIngredientsType) => {
  const [current, setCurrent] = useState('bun');

  const onIngredientClick = (elem: Ingredient) => {
    handleIngredient(elem)
    setModalVisibility(true)
  }

  const sectionsRef: SectionsRefType = {
    bun: useRef<HTMLElement | null>(null),
    main: useRef<HTMLElement | null>(null),
    sauce: useRef<HTMLElement | null>(null),
  };

  const container = useRef<HTMLDivElement | null>(null);

  const onTabClick = (value: string) => {
    let sectionRef = null
    switch (value) {
      case 'main': {
        sectionRef = sectionsRef.main
        break;
      }
      case 'sauce': {
        sectionRef = sectionsRef.sauce
        break
      }
      default:
        sectionRef = sectionsRef.bun
    }

    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setCurrent(value);
  };

  const handleScroll = () => {
    const scrollContainer = container.current;
    if (!scrollContainer) return;

    const scrollPosition = scrollContainer.scrollTop;

    const { bun, sauce, main } = sectionsRef;
    const bunY = bun.current ? bun.current.offsetTop : 0 || 0;
    const sauceY = sauce.current ? sauce.current.offsetTop : 0 || 0;
    const mainY = main.current ? main.current.offsetTop : 0 || 0;

    const visibleAreaTop = scrollPosition;
    const visibleAreaBottom = scrollPosition + scrollContainer.offsetHeight;

    const isInBunsSection = visibleAreaTop <= bunY && bunY < visibleAreaBottom;
    const isInSaucesSection = visibleAreaTop <= sauceY && sauceY < visibleAreaBottom;
    const isInMainsSection = visibleAreaTop <= mainY && mainY < visibleAreaBottom;

    if (isInBunsSection) {
      setCurrent('bun');
    } else if (isInSaucesSection) {
      setCurrent('sauce');
    } else if (isInMainsSection) {
      setCurrent('main');
    }
  };

  useEffect(() => {
    const scrollContainer = container.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      return () => {
        scrollContainer.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  return (
    <>
      <div className="col flex flex-col gap-10">
        <ul className="flex">
          {ingredients.map((item: Category) => {
            return (
              <li key={item.russianCategory}>
                <Tab value={item.category} active={current === item.category} onClick={() => onTabClick(item.category)}>
                  {item.russianCategory}
                </Tab>
              </li>
            )
          })}
        </ul>

        <div className={`${styles.scrollbar} custom-scroll  flex flex-col gap-10`} ref={container}>
          {ingredients.map((item, i) => {


            return (
              <section key={item.category} ref={sectionsRef[item.category]}>
                <h2 className="text text_type_main-medium mb-6">
                  {item.russianCategory}
                </h2>

                <ul className={`${styles.grid} pl-4 pr-4`}>
                  {item.items.map((elem: Ingredient) => {
                    return (
                      <li key={elem._id}>
                        <BurgerIngredient
                          elem={elem}
                          onIngredientClick={onIngredientClick}
                          onChoose={onChoose}
                        />
                      </li>
                    )
                  })}
                </ul>
              </section>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default memo(BurgerIngredients);
