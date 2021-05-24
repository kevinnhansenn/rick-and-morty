import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";
import { Button, Card, Spin, message, Image, Skeleton } from "antd";
import { useState, useEffect } from "react";
import { LeftOutlined } from "@ant-design/icons";

export default function Character() {
  const [information, setInformation] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [backLoading, setBackLoading] = useState(false);

  const router = useRouter();
  const { id } = router.query;

  const fetchCharacterById = async (id) => {
    const result = await fetch("/api/searchCharacter", {
      method: "post",
      body: id,
    });
    const { data } = await result.json();
    if (data) {
      setInformation(data.character);
    } else {
      message.error("Fetching profile error");
      setInformation(null);
    }
    setFetching(false);
  };

  useEffect(() => {
    if (id) {
      fetchCharacterById(id);
    }
  }, [id]);

  const goBack = () => {
    setBackLoading(true);
    router.back();
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Character Detail</title>
        <meta name="description" content="Character Detail" />
        <link rel="icon" href="favicon.png" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>My Profile</h1>
        <div className={styles.description}>
          <Button
            ghost
            onClick={goBack}
            type="primary"
            icon={<LeftOutlined />}
            size="large"
            loading={backLoading}
          >
            Back
          </Button>
        </div>

        <div className={styles.grid}>
          <Card style={{ minWidth: 500, minHeight: 420 }}>
            <Spin spinning={fetching}>
              <div className={styles.profile}>
                {!information ? (
                  <Skeleton.Input style={{ width: 200 }} active />
                ) : (
                  <span className={styles.infoName} key={"name"}>
                    {information.name}
                  </span>
                )}
              </div>
              <div className={styles.splitSection}>
                {!information ? (
                  <Skeleton.Image style={{ width: 270, height: 270 }} />
                ) : (
                  <Image
                    className={styles.picture}
                    key={"image"}
                    width={270}
                    src={information.image}
                  />
                )}
                <div className={styles.infoSection}>
                  <div className={styles.property}>
                    <div className={styles.label}>Gender</div>
                    {!information ? (
                      <Skeleton.Input style={{ width: 100 }} active />
                    ) : (
                      <div key={"gender"} className={styles.value}>
                        {information.gender}
                      </div>
                    )}
                  </div>
                  <div className={styles.property}>
                    <div className={styles.label}>Status</div>
                    {!information ? (
                      <Skeleton.Input style={{ width: 100 }} active />
                    ) : (
                      <div key={"status"} className={styles.value}>
                        {information.status}
                      </div>
                    )}
                  </div>
                  <div className={styles.property}>
                    <div className={styles.label}>Species</div>

                    {!information ? (
                      <Skeleton.Input style={{ width: 100 }} active />
                    ) : (
                      <div key={"species"} className={styles.value}>
                        {information.species}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Spin>
          </Card>
        </div>
        <div className={styles.footer}>&copy; Kevin Hansen - May 25, 2021</div>
      </main>
    </div>
  );
}
