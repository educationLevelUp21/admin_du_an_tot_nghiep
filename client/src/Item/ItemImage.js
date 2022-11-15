export default function ItemImage(props){
    const ip = "http://localhost:8080"
    return(
        <div className="card mb-2 border-0 p-0">
            <img src={ip + `/${props.files[0].filePath}`} width="200" height="200" className="card-img-top img-responsive" alt="img" />
        </div>
    )
}