import styled from 'styled-components'

export const Container = styled.div `
display:flex;
flex-direction: row;
justify-content: space-around;
align-items: center;
background-color: white;
`
export const MainContainer = styled.div `
display:flex;
flex-direction: column;
justify-content: space-around;
align-items: center;
background-color: white;
padding: 15px;
`
export const Text = styled.div `
font-family: Arial, Helvetica, sans-serif;
padding:5px;
font-size: 15px;
letter-spacing: 2px;
word-spacing: 2px;
color: #000000;
font-weight: 400;
text-decoration: none;
font-style: normal;
font-variant: normal;
text-transform: none;`


export const StyledButton = styled.button `
margin: 10px;
padding:0x;
background: transparent;
border: 5px groove rgba(20,20,20,0.17);
&:hover {
  background: 	rgb(255,240,219,0.5)
  
}
`


export const StyledInput = styled.input`
padding:6px;
font-size: 15px;
box-shadow: 0px 0px 5px rgba(66,66,66,.75);
   border: 5px groove rgba(20,20,20,0.17);
  }
   
`

export const Heading = styled.nav`
display: flex;
background: rgb(8,38,39);
justify-content: space-around;
align-items: center;
height: 80px;
`
export const DataContainer = styled.div `
box-sizing: content-box;
margin: 75px;
width: 1000x;
height: 100px;
display:flex;
flex-direction: column;
justify-content: center;
overflow: auto;
`

export const HeadingText = styled.div `
font-family: Arial, Helvetica, sans-serif;
padding:5px;
font-size: 25px;
letter-spacing: 2px;
word-spacing: 2px;
color: white;
font-weight: 400;
text-decoration: none;
font-style: normal;
font-variant: normal;
text-transform: none;`


