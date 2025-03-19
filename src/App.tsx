import {
  createSignal,
  For,
  ParentComponent,
  Switch,
  type Component,
} from "solid-js";
import ContextMenu from "@/components/ContextMenu";
import { Button } from "./components/ui/button";

const InlineError: ParentComponent<{ error: string }> = (props) => {
  return (
    <ContextMenu error={props.error}>
      <span
        id="error"
        class="bg-[url(/squiggly-boy.svg)] bg-[0_calc(100%_+_1px)] bg-repeat-x"
        aria-invalid="grammar"
      >
        {props.children}
      </span>
    </ContextMenu>
  );
};

type Line = {
  text: string;
  spans: { error: string | null; start: number; end: number }[];
};

const TextEditor: Component<{
  lines: Line[];
  ref: HTMLDivElement | undefined;
}> = (props) => {
  return (
    <div
      contenteditable={true}
      role="textbox"
      aria-multiline="true"
      class="mx-auto w-3/6 my-2 border-2 p-4 h-90 whitespace-pre-wrap"
      title="Rich Text Editor"
      ref={props.ref}
    >
      <For each={props.lines}>
        {({ text, spans }) => {
          return (
            <p>
              <For each={spans}>
                {({ error, start, end }) => {
                  const slice = text.slice(start, end);
                  return !error ? (
                    <>{slice}</>
                  ) : (
                    <InlineError error={error}>{slice}</InlineError>
                  );
                }}
              </For>
            </p>
          );
        }}
      </For>
    </div>
  );
};

const App: Component = () => {
  const text2: Line[][] = [
    [
      {
        spans: [
          {
            end: 2,
            error: "Sentences should begin with a capital letter",
            start: 0,
          },
          { end: 999999, error: null, start: 2 },
        ],
        text: "hi hi the the the the",
      },
      {
        spans: [
          {
            end: 999999999,
            error: "Glue percentage too high: 66.7%",
            start: 0,
          },
        ],
        text: "hi hi the the the the",
      },
    ],
  ];

  const [text, setText] = createSignal(text2);
  let editor: HTMLDivElement | undefined;

  const [i, setI] = createSignal(0);
  const currText = () => text().map((xs) => xs[i()]);

  const fetchLines = async () => {
    const text = editor.innerText.split("\n\n");
    console.log(text);
    const data = await fetch("http://localhost:3003/test", {
      method: "POST",
      body: JSON.stringify(text),
    });
    const json = await data.json();

    console.debug(json);

    setText(json);
  };

  return (
    <main class="flex flex-col justify-center items-center">
      <h1 class="text-center text-xl py-2">Writing Helper</h1>
      <TextEditor ref={editor} lines={currText()} />
      <Button onClick={fetchLines}>Check for Errors</Button>
      <select onChange={(e) => setI(+e.target.value)}>
        <option value="0">Capitals</option>
        <option value="1">Glue</option>
      </select>
    </main>
  );
};

export default App;
