/* eslint-disable react/prop-types */
import Meaning from "./Meaning.jsx";
import Phonetic from "./Phonetic.jsx";

export default function Results(props) {
  if (props.results?.data?.results) {
    return (
      <div className="rounded-lg">
        <span className="text-sm m-2 p-4 h-fit">
          {console.log(props)}
          {props.results.data.results.map((defination) => {
            return (
              <div key={defination.description}>
                <p className="p-2">
                  <strong>Definition: </strong>
                  <span className="text-green-400">
                    {defination.description}
                  </span>
                  <br/>
                  <strong>Website: </strong>
                  <em>{defination.url}</em>
                </p>
              </div>
            );
          })}
        </span>
      </div>
    );
  } else {
    return null;
  }
}
