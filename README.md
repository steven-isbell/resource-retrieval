# resource-retrieval

A scraper for pulling all available resources from https://www.github.com/steven-isbell/resources.
It will print the resources to a JSON file in your file tree following a title, value structure where the title is the resource heading
and the value is an array of resource objects with a title and link.

```json
{
    "title": "REACT Resources",
    "resources": [
      {
        "title": "Awesome React - Catalog of React Components & Libraries",
        "url": "https://github.com/brillout/awesome-react-components"
      },
      {
        "title": "React-Native Components",
        "url": "http://www.awesome-react-native.com/"
      },
      {
        "title": "Styled Components",
        "url": "https://www.styled-components.com/"
      },
      { "title": "Glamorous", "url": "https://glamorous.rocks/" },
      {
        "title": "Material-UI For React",
        "url": "http://www.material-ui.com/"
      },
      { "title": "Aphrodite", "url": "https://github.com/Khan/aphrodite" },
      {
        "title": "Styled Components Guide",
        "url":
          "https://www.sitepoint.com/style-react-components-styled-components/"
      }
    ]
  }
```
