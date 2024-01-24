import { ProgressBar } from 'react-loader-spinner'

export const PageLoader = () => {
  return (
    <div style={{
      display : "flex",
      flexDirection : "column",
      alignContent : "center",
      alignItems : "center",
      justifyContent : "center",
      width : "100%",
      height : "100%",
      backgroundColor : "black"
  }}>
        <h1 style={{ color : "violet", fontSize : "150px", fontFamily : "cursive"}}>Chill App</h1>
        <ProgressBar
            visible={true}
            barColor='violet'
            height={"200"}
            width={"200"}
        />
    </div>
  )
}
