export const ClientschemaData =()=>( {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Client Stories & Custom Build Gallery | Big Bear Vans",
  "description": "Explore our custom van builds: Lake Tahoe (Family), Blue Whale (6-Seater), Cusco (Pet-friendly), MotoVan (Adventure), and San Diego (Mobile Office).",
  "url": "https://www.bigbearvans.com/our-clients",
  "mainEntity": {
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Lake Tahoe Campervan",
        "item": {
          "@type": "Product",
          "name": "Lake Tahoe Campervan - Family Edition",
          "description": "144 AWD Sprinter for a family of four with elevator bed system."
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blue Whale Campervan",
        "item": {
          "@type": "Product",
          "name": "Blue Whale - 6 Seater Campervan",
          "description": "Short campervan with seating/sleeping for six, featuring a rooftop hammock."
        }
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Cusco Campervan",
        "item": {
          "@type": "Review",
          "author": { "@type": "Person", "name": "Cathy and Ben" },
          "reviewBody": "One of the big reasons we chose Big Bear Vans was for our four dogs.",
          "itemReviewed": {
            "@type": "Product",
            "name": "Cusco & Sasha Pet-Friendly Vans"
          }
        }
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "The MotoVan",
        "item": {
          "@type": "Product",
          "name": "MotoVan - Adventure Basecamp",
          "description": "Exclusive van with a dedicated garage for three motorcycles and sleeping for five."
        }
      },
      {
        "@type": "ListItem",
        "position": 5,
        "name": "Vermont Campervan",
        "item": {
          "@type": "Review",
          "author": { "@type": "Person", "name": "Client from Vermont" },
          "reviewBody": "It feels so homey. Big Bear Vans adapted to more than two travelers.",
          "itemReviewed": { "@type": "Product", "name": "Vermont 170 AWD Sprinter" }
        }
      },
      {
        "@type": "ListItem",
        "position": 6,
        "name": "San Diego Campervan",
        "item": {
          "@type": "Review",
          "author": { "@type": "Person", "name": "Remote Worker / Architect" },
          "reviewBody": "I am a remote worker, so I wanted an office space as well as a beefy electrical system.",
          "itemReviewed": { "@type": "Product", "name": "San Diego Mobile Office Van" }
        }
      }
    ]
  }
})
