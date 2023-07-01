/* eslint-disable react/prop-types */
export default function Meaning(props) {
  return (
    <div className="pb-2">
      <h3 className="text-gray-400">{props.meaning.partOfSpeech}</h3>
      {props.meaning.definitions.map(function (definition, index) {
        return (
          <div key={index}>
            <p className="p-2">
              <strong>Definition: </strong>
              <span className="text-green-400">{definition.definition}</span>
              <br />
              <strong>Example: </strong>
              <em>{definition.example}</em>
            </p>
          </div>
        );
      })}
    </div>
  );
}
