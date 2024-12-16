import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  //Load the React code when we initialize
  initialize() {
    this.componentPromise = import("./components/autocomplete");
  }

  async connect() {
    this.component = await this.componentPromise;

    const root = this.targets.find("root");
    const selectedOption = this.targets.find("selected-option");

    const props = {
      value: selectedOption.value,
      onSelected: this.onSelected.bind(this),
    };

    this.component.render(root, props);
  }

  onSelected(value) {
    this.targets.find("selected-option").value = value;
  }

  disconnect() {
    const root = this.targets.find("root");

    this.component.destroy(root);
  }
}
