import Button from "react-bootstrap/Button";
import { useCallback } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  ReactFlowProvider,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";

const edgeOptions = {
  animated: true,
};

const initialNodes = [
  { id: "1", position: { x: 200, y: 0 }, data: { label: "Main Account" } },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "Spending Account" } },
  { id: "3", position: { x: 200, y: 100 }, data: { label: "Savings Account" } },
  {
    id: "4",
    position: { x: 600, y: 100 },
    data: { label: "Investment Account" },
  },
  {
    id: "A",
    type: "output",
    position: { x: -10, y: 200 },
    data: null,
    style: {
      width: 170,
      height: 160,
    },
  },
  {
    id: "A-1",
    type: "input",
    data: { label: "Food" },
    position: { x: 10, y: 10 },
    parentNode: "A",
    extent: "parent",
    draggable: false,
  },
  {
    id: "A-2",
    data: { label: "Groceries" },
    position: { x: 10, y: 60 },
    parentNode: "A",
    extent: "parent",
    draggable: false,
  },
  {
    id: "A-3",
    data: { label: "Transport" },
    position: { x: 10, y: 110 },
    parentNode: "A",
    extent: "parent",
    draggable: false,
  },
  {
    id: "B",
    type: "output",
    position: { x: 190, y: 200 },
    data: null,
    style: {
      width: 170,
      height: 110,
    },
  },
  {
    id: "B-1",
    type: "input",
    data: { label: "Downpayment" },
    position: { x: 10, y: 10 },
    parentNode: "B",
    extent: "parent",
    draggable: false,
  },
  {
    id: "B-2",
    data: { label: "Wedding" },
    position: { x: 10, y: 60 },
    parentNode: "B",
    extent: "parent",
    draggable: false,
  },
  {
    id: "C",
    type: "output",
    position: { x: 390, y: 275 },
    data: null,
    style: {
      width: 170,
      height: 60,
    },
  },
  {
    id: "C-1",
    type: "input",
    data: { label: "SPY" },
    position: { x: 10, y: 10 },
    parentNode: "C",
    extent: "parent",
    draggable: false,
  },

  {
    id: "D",
    type: "output",
    position: { x: 590, y: 275 },
    data: null,
    style: {
      width: 170,
      height: 160,
    },
  },
  {
    id: "D-1",
    type: "input",
    data: { label: "ABC" },
    position: { x: 10, y: 10 },
    parentNode: "D",
    extent: "parent",
    draggable: false,
  },
  {
    id: "D-2",
    data: { label: "XYZ" },
    position: { x: 10, y: 60 },
    parentNode: "D",
    extent: "parent",
    draggable: false,
  },
  {
    id: "D-3",
    data: { label: "2801" },
    position: { x: 10, y: 110 },
    parentNode: "D",
    extent: "parent",
    draggable: false,
  },
  {
    id: "E",
    type: "output",
    position: { x: 790, y: 275 },
    data: null,
    style: {
      width: 170,
      height: 160,
    },
  },
  {
    id: "E-1",
    type: "input",
    data: { label: "BTC" },
    position: { x: 10, y: 10 },
    parentNode: "E",
    extent: "parent",
    draggable: false,
  },
  {
    id: "E-2",
    data: { label: "ETH" },
    position: { x: 10, y: 60 },
    parentNode: "E",
    extent: "parent",
    draggable: false,
  },
  {
    id: "E-3",
    data: { label: "SOL" },
    position: { x: 10, y: 110 },
    parentNode: "E",
    extent: "parent",
    draggable: false,
  },
  { id: "5", position: { x: 400, y: 200 }, data: { label: "US Market" } },
  { id: "6", position: { x: 600, y: 200 }, data: { label: "China Market" } },
  { id: "7", position: { x: 800, y: 200 }, data: { label: "Crypto" } },
  // { id: "6", position: { x: 50, y: 250 }, data: { label: "Groceries" } },
  // { id: "7", position: { x: 50, y: 300 }, data: { label: "Transport" } },
];

const initialEdges = [
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e1-3", source: "1", target: "3", animated: true },
  { id: "e1-4", source: "1", target: "4", animated: true },
  { id: "e2-A", source: "2", target: "A", animated: true },
  { id: "e3-B", source: "3", target: "B", animated: true },
  { id: "e4-5", source: "4", target: "5", animated: true },
  { id: "e4-6", source: "4", target: "6", animated: true },
  { id: "e4-6", source: "4", target: "7", animated: true },
  { id: "e5-C", source: "5", target: "C", animated: true },
  { id: "e6-D", source: "6", target: "D", animated: true },
  { id: "e7-E", source: "7", target: "E", animated: true },
];

let nodeId = 10;

function FlowPage() {
  const reactFlowInstance = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onClick = useCallback(() => {
    const id = `${++nodeId}`;
    const newNode = {
      id,
      position: {
        x: 10,
        y: 10,
      },
      data: {
        label: `Node ${id}`,
      },
    };
    reactFlowInstance.addNodes(newNode);
  }, []);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div className="flow">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        defaultEdgeOptions={edgeOptions}
        fitView
      >
        {/* <MiniMap /> */}

        <Controls />
        <Background color="#000" variant={"dots"} />
      </ReactFlow>
      <div className="w-100 p-3 d-flex align-items-center justify-content-center">
        <Button onClick={onClick} variant="dark">
          Add New Node
        </Button>
      </div>
    </div>
  );
}

export default function () {
  return (
    <ReactFlowProvider>
      <FlowPage />
    </ReactFlowProvider>
  );
}
