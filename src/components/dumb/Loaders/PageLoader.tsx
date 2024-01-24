import { ProgressBar } from 'react-loader-spinner'

export const PageLoader = () => {
  return (
    <div style={{
      display : "flex",
      alignContent : "center",
      alignItems : "center",
      justifyContent : "center",
      width : "100%",
      height : "100%",
      backgroundColor : "black"
  }}>
        <ProgressBar
            visible={true}
            barColor='violet'
            height={"200"}
            width={"200"}
        />
    </div>
  )
}
