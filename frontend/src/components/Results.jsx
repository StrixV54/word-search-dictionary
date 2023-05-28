import Meaning from "./Meaning.jsx";
import Phonetic from "./Phonetic.jsx";

export default function Results(props) {
  if (props.results) {
    return (
      <div className="rounded-lg">
        <span className="text-sm m-2 p-4 h-fit">
          <h2>{props.results.word}</h2>
          {props.results.phonetics.map((phonetic, index) => {
            return (
              <div key={index}>
                <Phonetic phonetic={phonetic} />
              </div>
            );
          })}
        </span>
        {props.results.meanings.map((meaning, index) => {
          return (
            <section key={index} className="text-sm">
              <Meaning meaning={meaning} />
            </section>
          );
        })}
      </div>
    );
  } else {
    return null;
  }
}
