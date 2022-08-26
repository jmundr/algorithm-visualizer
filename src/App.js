// Dependencies
import { useState, useEffect, useRef } from "react";
import Bars from "./components/Bars";
import Header from "./components/Header";
import Settings from "./components/Settings";
import _ from "lodash";

// Initialise App
function App() {
  // Initialise the react states
  const [config, updateConfig] = useState({
    arrayLength: 25,
    sortSpeed: 1,
    algorithm: "bubble",
  });

  const [bars, updateBars] = useState(
    [...Array(config.arrayLength)].map(
      (i) => (i = { value: Math.floor(Math.random(1) * 25), state: "idle" })
    )
  );

  const [shouldPlay, setShouldPlay] = useState(true);

  const [settingsVisible, setSettingsVisible] = useState(false);

  const stop = useRef(true);

  const sorter = useRef(null);

  const goToNextState = () => {
    if (stop.current) return;
    if (sorter.current) sorter.current.next();
  };

  // Define the UI functions
  function onLengthChange(event, value) {
    updateConfig(
      prevState => ({ ...prevState, arrayLength: value })
    );
    updateBars(
      [...Array(value)].map(
        (i) => (i = { value: Math.floor(Math.random(1) * 25), state: "idle" })
      )
    );
  }

  function onSpeedChange(event, value) {
    updateConfig(
      prevState => ({ ...prevState, sortSpeed: 5.1 - value })
    );
  }

  function onToggleClick() {
    setShouldPlay((val) => !val);
    stop.current = !stop.current;
  }

  function toggleSettings() {
    setSettingsVisible(!settingsVisible);
  }

  function resetToggleClick() {
    sorter.current = null;
    updateBars(
      [...Array(config.arrayLength)].map(
        (i) => (i = { value: Math.floor(Math.random(1) * 25), state: "idle" })
      )
    );
  }

  function handleAlgorithmChange(value) {
    updateConfig(
      prevState => ({ ...prevState, algorithm: value })
    );
  }

  useEffect(() => {
    // Define the algorithmic functions
    function renderSelect(pos1, pos2, pos3) {
      updateBars((array) =>
        Array.from(array, (element, index) => {
          return index === pos1
            ? { value: element.value, state: "selected" }
            : index === pos2
            ? { value: element.value, state: "selected" }
            : index === pos3
            ? { value: element.value, state: "selected" }
            : { value: element.value, state: "idle" };
        })
      );
    }

    function renderSwap(x, pos1, pos2) {
      if (x !== null) {
        updateBars((array) =>
          Array.from(array, (element, index) => {
            return index === pos1
              ? { value: x[pos1], state: "smaller", key: x[pos1] }
              : index === pos2
              ? { value: x[pos2], state: "greater", key: x[pos2] }
              : {
                  value: element.value,
                  state: element.state !== "selected" ? "idle" : "selected",
                };
          })
        );
      }
      goToNextState();
    }

    function renderCompletion() {
      updateBars((array) =>
        Array.from(array, (element) => {
          return { value: element.value, state: "completed" };
        })
      );
    }

    function delay(time) {
      return new Promise((resolve) => {
        setTimeout(resolve, time * 1000);
      });
    }

    // Define the algorithms as a dictionary
    const algorithms = {
      bubble: async function* bubbleSort(array) {
        let swap = true;

        while (swap) {
          swap = false;
          for (let i = 0; i < array.length; i++) {
            if (stop.current) {
              swap = false;
              break;
            }
            await delay(config.sortSpeed);
            renderSelect(i);
            if (array[i] > array[i + 1]) {
              let cache = array[i];
              array[i] = array[i + 1];
              array[i + 1] = cache;
              yield renderSwap(array, i, i + 1);
              swap = true;
            }
          }
        }
        if (!stop.current) {
          renderCompletion();
        }
      },

      insertion: async function* insertionSort(array) {
        let i, key, j;
        for (i = 1; i < array.length; i++) {
          if (stop.current) {
            break;
          }

          key = array[i];

          renderSelect(i);

          j = i - 1;

          while (j >= 0 && array[j] > key) {
            await delay(config.sortSpeed);
            array[j + 1] = array[j];
            yield renderSwap(array, j, j + 1);

            j = j - 1;
          }
          array[j + 1] = key;
          yield renderSwap(array, key, j + 1);

          if (!stop.current) {
            renderCompletion();
          }
        }
      },

      quick: async function quickSort(array) {
        async function partition(D, low, high) {
          let i;
          let j;
          let s;
          while (high > low) {
            if (stop.current) {
              break;
            }
            i = low;
            j = high;
            s = D[low];

            while (i < j) {
              if (stop.current) {
                break;
              }
              renderSelect(high, low);
              await delay(config.sortSpeed);

              while (D[j] > s) {
                if (stop.current) {
                  break;
                }
                renderSelect(high, low, j);
                await delay(config.sortSpeed);
                renderSelect(high, low);

                j--;
              }
              D[i] = D[j];

              renderSwap(array, i, j);
              await delay(config.sortSpeed);

              while (s >= D[i] && i < j) {
                if (stop.current) {
                  break;
                }
                renderSelect(high, low, j);
                await delay(config.sortSpeed);
                renderSelect(high, low);

                i++;
              }
              D[j] = D[i];

              renderSwap(array, j, i);
              await delay(config.sortSpeed);
            }

            D[i] = s;

            renderSwap(array, i, s);
            await delay(config.sortSpeed);

            partition(D, low, i - 1);
            low = i + 1;
          }
          if (!stop.current) {
            renderCompletion();
          }
        }
        partition(array, 0, array.length - 1);
      },

      bogo: async function* bogoSort(array) {
        function sorted(array) {
          let sorted = true;

          for (let i = 0; i < array.length - 1; i++) {
            if (array[i + 1] < array[i]) {
              sorted = false;
            }
          }

          return sorted;
        }

        while (!sorted(array)) {
          if (stop.current) {
            break;
          }
          array = _.shuffle(array);
          updateBars(
            array.map(
              (i) =>
                (i = {
                  value: i,
                  state:
                    Math.floor(Math.random(1) * 2) + 1 === 2
                      ? "greater"
                      : "smaller",
                })
            )
          );
          yield renderSwap(null);
          await delay(config.sortSpeed);
        }
        if (!stop.current) {
          renderCompletion();
        }
      },
    };

    if (!shouldPlay) {
      if (config.algorithm !== "quick") {
        sorter.current = algorithms[config.algorithm](
          Array.from(bars, (element) => {
            return element.value;
          })
        );
        sorter.current.next();
      } else {
        algorithms[config.algorithm](
          Array.from(bars, (element) => {
            return element.value;
          })
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldPlay, config.sortSpeed]);

  return (
    <>
      <div>
        <Header
          onToggleClick={onToggleClick}
          resetToggleClick={resetToggleClick}
          handleAlgorithmChange={handleAlgorithmChange}
          shouldPlay={shouldPlay}
          toggleSettings={toggleSettings}
          settingsVisible={settingsVisible}
          algorithm={config.algorithm}
        />
      </div>
      {settingsVisible ? (
        <Settings
          onSpeedChange={onSpeedChange}
          onLengthChange={onLengthChange}
          shouldPlay={shouldPlay}
          sortSpeed={config.sortSpeed}
          arrayLength={config.arrayLength}
        />
      ) : (
        <div>
          <Bars bars={bars} updateBars={updateBars} />
        </div>
      )}
    </>
  );
}

export default App;