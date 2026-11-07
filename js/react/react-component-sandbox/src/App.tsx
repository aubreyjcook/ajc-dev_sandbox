import { Badge } from "./components/Badge";
import { Button } from "./components/Button";
import { WorldMap } from "./components/WorldMap";

export function App() {
  return (
    <main>
      <h1>Component showcase</h1>

      <section>
        <h2>WorldMap</h2>
        <WorldMap
          highlighted={["Brazil", "France", "Australia", "Japan", "Egypt"]}
        />
      </section>

      <section>
        <h2>Button</h2>
        <Button onClick={() => console.log("clicked")}>Click me</Button>
      </section>

      <section>
        <h2>Badge</h2>
        <Badge>new</Badge>
      </section>
    </main>
  );
}
