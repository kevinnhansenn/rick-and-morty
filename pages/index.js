import Head from "next/head";
import QueueAnim from "rc-queue-anim";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { Input, Button, Card, Spin, Avatar, Tooltip, message } from "antd";
import { useRef, useState, useContext, useEffect } from "react";
import Image from "next/image";
import {
  CloseOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { EpisodeContext } from "./_app";

export default function Home({ setEpisodeId }) {
  const input = useRef(null);
  const [information, setInformation] = useState(null);
  const [fetching, setFetching] = useState(false);
  const router = useRouter();

  const episodeId = useContext(EpisodeContext);

  useEffect(() => {
    if (episodeId) {
      input.current.state.value = episodeId;
      fetchById(episodeId);
    }
  }, []);

  const fetchById = async () => {
    const query = input.current.state.value;

    if (!query || !query.trim()) return message.error("ID cannot be empty");

    setFetching(true);
    const result = await fetch("/api/searchEpisode", {
      method: "post",
      body: query.trim(),
    });
    const { data } = await result.json();
    if (data) {
      setInformation(data.episode);
      setEpisodeId(query.trim());
    } else {
      setInformation([]);
    }

    setFetching(false);
  };

  const resetSearch = () => {
    input.current.state.value = "";
    input.current.focus();
    setEpisodeId(null);
    setInformation(null);
  };

  const selectCharacter = (id) => {
    setFetching(true);
    router.push(`/character?id=${id}`);
  };

  return (
    <div>
      <Head>
        <title>Home</title>
        <meta name="description" content="Home" />
        <link rel="icon" href="favicon.png" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Rick and Morty</h1>
        <div className={styles.description}>
          <div>
            <Input
              ref={input}
              size="large"
              placeholder="Search by Episode ID"
              onPressEnter={fetchById}
              allowClear
            />
          </div>
          <div>
            <Button
              ghost
              type="primary"
              icon={<SearchOutlined />}
              size="large"
              onClick={fetchById}
            />
          </div>
          <div>
            <Button
              danger
              icon={<CloseOutlined />}
              onClick={resetSearch}
              size="large"
            />
          </div>
        </div>

        <div className={styles.grid}>
          <Card style={{ minWidth: 500, minHeight: 420 }}>
            <Spin spinning={fetching}>
              {!information ? (
                <div className={styles.pleaseSearch}>
                  <Image
                    src="/search.svg"
                    alt="Please search by id"
                    width={350}
                    height={280}
                  />
                  <div className={styles.instruction}>
                    Please search an episode by its ID
                  </div>
                </div>
              ) : !information.id ? (
                <div className={styles.pleaseSearch}>
                  <Image
                    src="/notFound.svg"
                    alt="Data not found"
                    width={350}
                    height={280}
                    className={styles.svg}
                  />
                  <div className={styles.instruction}>
                    Could not find episode with that ID
                  </div>
                </div>
              ) : (
                <QueueAnim type={["right", "left"]} leaveReverse>
                  <div className={styles.property} key={"name"}>
                    <div className={styles.label}>Episode Name:</div>
                    <div className={styles.value}>{information.name}</div>
                  </div>
                  <div className={styles.property} key={"air_date"}>
                    <div className={styles.label}>Air Date:</div>
                    <div className={styles.value}>{information.air_date}</div>
                  </div>
                  <div className={styles.property} key={"created"}>
                    <div className={styles.label}>Created Date:</div>
                    <div className={styles.value}>{information.created}</div>
                  </div>
                  <div className={styles.property} key={"characters"}>
                    <div className={styles.label}>
                      Characters: &nbsp;
                      <Tooltip title="Click the character name to show more details">
                        <QuestionCircleOutlined />
                      </Tooltip>
                    </div>
                    <QueueAnim type={["right", "left"]} leaveReverse>
                      {information.characters.map((character) => {
                        return (
                          <div className={styles.list} key={character.id}>
                            <Avatar src={character.image} />
                            <span
                              className={styles.characterName}
                              onClick={() => selectCharacter(character.id)}
                            >
                              {character.name}
                            </span>
                          </div>
                        );
                      })}
                    </QueueAnim>
                  </div>
                </QueueAnim>
              )}
            </Spin>
          </Card>
        </div>
        <div className={styles.footer}>&copy; Kevin Hansen - May 25, 2021</div>
      </main>
    </div>
  );
}
