export function composeBuildObject(state) {
  return {
    year: state.year,
    type: state.type,
    number: state.number,
    name: state.type === 'action' ? state.name : state.name.label,
    resource: state.type === 'action' ? state.resource : state.resource.label,
    cost: state.cost,
    text: (state.type === 'volunteer' || state.type === 'action') ? state.text.label : state.text.label,
    physics: state.physics,
    biology: state.biology,
    presentation: state.presentation,
    acting: state.acting
  };
}
