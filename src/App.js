import { useState } from "react"

const episodes = [
  {
    id: 9881,
    name: "Black Comedy",
    genres: ["Comedy"],
    status: "Running",
    runtime: 30,
    type: "Scripted",
    image: {
      medium: "https://static.tvmaze.com/uploads/images/medium_portrait/391/978174.jpg",
      original: "https://static.tvmaze.com/uploads/images/original_untouched/391/978174.jpg",
    },
  },
  {
    id: 39037,
    name: "Comedy Legends",
    genres: ["Comedy"],
    status: "Running",
    runtime: 60,
    type: "Documentary",
    image: {
      medium: "https://static.tvmaze.com/uploads/images/medium_portrait/171/428737.jpg",
      original: "https://static.tvmaze.com/uploads/images/original_untouched/171/428737.jpg",
    },
  },
  {
    id: 15038,
    name: "Comedy Баттл",
    genres: [],
    status: "Running",
    runtime: 45,
    type: "Variety",
    image: {
      medium: "https://static.tvmaze.com/uploads/images/medium_portrait/237/594619.jpg",
      original: "https://static.tvmaze.com/uploads/images/original_untouched/237/594619.jpg",
    },
  },
  {
    id: 3152,
    name: "Inside Comedy",
    genres: ["Comedy"],
    status: "Ended",
    runtime: 30,
    type: "Talk Show",
    image: {
      medium: "https://static.tvmaze.com/uploads/images/medium_portrait/17/43207.jpg",
      original: "https://static.tvmaze.com/uploads/images/original_untouched/17/43207.jpg",
    },
  },
  {
    id: 18590,
    name: "Comedy Connections",
    genres: ["Comedy"],
    status: "Ended",
    runtime: 30,
    type: "Documentary",
    image: {
      medium: "https://static.tvmaze.com/uploads/images/medium_portrait/63/158497.jpg",
      original: "https://static.tvmaze.com/uploads/images/original_untouched/63/158497.jpg",
    },
  },
  {
    id: 10428,
    name: "Comedy Playhouse",
    genres: ["Comedy"],
    status: "Ended",
    runtime: 30,
    type: "Scripted",
    image: {
      medium: "https://static.tvmaze.com/uploads/images/medium_portrait/35/88167.jpg",
      original: "https://static.tvmaze.com/uploads/images/original_untouched/35/88167.jpg",
    },
  },
  {
    id: 6490,
    name: "Comedy Shuffle",
    genres: ["Comedy"],
    status: "Ended",
    runtime: 30,
    type: "Variety",
    image: {
      medium: "https://static.tvmaze.com/uploads/images/medium_portrait/79/197899.jpg",
      original: "https://static.tvmaze.com/uploads/images/original_untouched/79/197899.jpg",
    },
  },
  {
    id: 10544,
    name: "Comedy Shorts",
    genres: ["Comedy"],
    status: "Ended",
    runtime: 5,
    type: "Variety",
    image: {
      medium: "https://static.tvmaze.com/uploads/images/medium_portrait/35/89096.jpg",
      original: "https://static.tvmaze.com/uploads/images/original_untouched/35/89096.jpg",
    },
  },
  {
    id: 22966,
    name: "Talking Comedy",
    genres: ["Comedy"],
    status: "Ended",
    runtime: 30,
    type: "Documentary",
    image: {
      medium: "https://static.tvmaze.com/uploads/images/medium_portrait/85/212871.jpg",
      original: "https://static.tvmaze.com/uploads/images/original_untouched/85/212871.jpg",
    },
  },
  {
    id: 16500,
    name: "Comedy Showroom",
    genres: ["Comedy"],
    status: "Ended",
    runtime: 30,
    type: "Scripted",
    image: {
      medium: "https://static.tvmaze.com/uploads/images/medium_portrait/55/137516.jpg",
      original: "https://static.tvmaze.com/uploads/images/original_untouched/55/137516.jpg",
    },
  },
]

function EpisodeStatusFilterForm({ summary, onChange }) {
  return (
    <form onChange={(e) => onChange(e.target.value)}>
      {Object.entries(summary).map(([status, count]) => {
        return (
          <div key={status}>
            <input type="radio" id="status" name="status" value={status} />
            <label htmlFor="status" style={{ color: status === "Running" ? "green" : "purple" }}>
              {status} ({count})
            </label>
          </div>
        )
      })}
    </form>
  )
}

function EpisodeList({ epiosodes }) {
  return (
    <ul
      style={{
        listStyle: "none",
        display: "flex",
        flexWrap: "wrap",
        padding: 0,
        gap: "1rem",
      }}
    >
      {epiosodes.map((epiosode) => {
        return (
          <li key={epiosode.id} style={{ display: "flex", flexDirection: "column" }}>
            <img src={epiosode.image.medium} alt={`Post for ${epiosode.name}`}></img>
            {epiosode.name}: {epiosode.status}
          </li>
        )
      })}
    </ul>
  )
}

export function App() {
  let [selectedStatus, setSelectedStatus] = useState()
  let summaryByStatus = {}
  for (let episode of episodes) {
    summaryByStatus[episode.status] = (summaryByStatus[episode.status] || 0) + 1
  }
  const visibleEpisodes = selectedStatus ? episodes.filter((episode) => episode.status === selectedStatus) : episodes

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Status</h1>
      <EpisodeStatusFilterForm summary={summaryByStatus} onChange={setSelectedStatus} />
      <h1>Episodes</h1>
      <EpisodeList epiosodes={visibleEpisodes} />
    </div>
  )
}

export default App
