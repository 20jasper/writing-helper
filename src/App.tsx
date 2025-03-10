import { ParentComponent, type Component } from "solid-js";
import ContextMenu from "@/components/ContextMenu";

const InlineError: ParentComponent = (props) => {
  return (
    <ContextMenu>
      <span
        id="error"
        class="underline decoration-red-500 decoration-2"
        aria-invalid="grammar"
      >
        {props.children}
      </span>
    </ContextMenu>
  );
};

const App: Component = () => {
  return (
    <main>
      <h1 class="text-center text-xl py-2">Writing Helper</h1>
      <div
        contenteditable={true}
        role="textbox"
        aria-multiline="true"
        class="mx-auto max-w-prose my-2 border-2 p-4"
        title="Rich Text Editor"
      >
        <p>hello</p>
        <p>
          gamer hello <InlineError>cool</InlineError> is hello
        </p>
      </div>
    </main>
  );
};

export default App;
