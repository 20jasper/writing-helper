import { createSignal, type Component } from "solid-js";
import { Portal } from "solid-js/web";

const App: Component = () => {
  const [showDialog, setShowDialog] = createSignal(false);

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
          gamer{" "}
          <span
            id="error"
            class="underline decoration-red-500 decoration-2"
            aria-invalid="grammar"
            oncontextmenu={(e) => {
              e.preventDefault();
              setShowDialog(true);
            }}
          >
            cool
          </span>{" "}
          is hello
        </p>
      </div>
      <Portal>
        <dialog id="dialog" open={showDialog()} class="border-4 m-auto">
          <p>You have made a grave mistake</p>
          <button class="border-2" onclick={() => setShowDialog(false)}>
            Ok
          </button>
        </dialog>
      </Portal>
    </main>
  );
};

export default App;
