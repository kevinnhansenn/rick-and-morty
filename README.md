# Rick and Morty GraphQL

```
Simple searching engine for Rick and Morty using Apollo GraphQL.

Frontend Framework  : Next.js
UI Framework        : Ant Design
Query Language      : Apollo GraphQL
Routing             : Next Router
```

## Run Project Locally

Please make sure Yarn has been installed into your local machine.

```bash
git clone https://github.com/kevinnhansenn/rick-and-morty.git

cd rick-and-morty/

yarn

yarn dev

# After the program compiled successfully.
# On your browser, Open [http://localhost:3000]
```

## Quick Demo
![Quick Demo](quick-demo.gif)

## Query Syntax

```
Fetching an episode details by id: 

    gql`
        query {
            episode(id: ${id}) {
                id
                name
                air_date
                created
                characters {
                    id
                    name
                    image
                }
            }
        }
    `



Fetching a character details by id: 

    gql`
        query {
            character(id: ${id}) {
                id,
                name,
                status,
                species,
                gender,
                image
            }
        }
    `
```

## Credit
&copy; Kevin Hansen - May 25, 2021
