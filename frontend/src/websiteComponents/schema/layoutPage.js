export const generateLayoutsSchema = () => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Custom Camper Van Layouts | Big Bear Vans",
  "description": "Explore our flagship layouts: Santa Monica (Short Van), Montreal (Long Van), and custom designs for families and couples.",
  "url": "https://bigbearvans.com/layouts",
  "mainEntity": {
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Family Layouts (3-9 People)",
        "url": "https://bigbearvans.com/layout-by-category/Layouts%20for%20Families%20(3%E2%80%939%20People)"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Couple Layouts",
        "url": "https://bigbearvans.com/layout-by-category/Layouts%20for%20Solo%20&%20Couple%20Travelers"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Short Van — Santa Monica",
        "url": "https://bigbearvans.com/layout-by-category/Flagship Short Van — Santa Monica"
      },
       {
        "@type": "ListItem",
        "position": 4,
        "name": "Long Van — Montreal",
        "url": "https://bigbearvans.com/layout-by-category/Flagship Long Van — Montreal"
      },
      {
        "@type": "ListItem",
        "position": 5,
        "name": "Portfolio of Custom Builds",
        "url": "https://bigbearvans.com/layout-by-category/Portfolio of Custom Builds"
      }
    ]
  }
});