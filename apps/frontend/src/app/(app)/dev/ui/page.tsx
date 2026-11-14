import { notFound } from "next/navigation";

import { Arrow } from "@/components/ui/Arrow/Arrow";
import { BlockCursor } from "@/components/ui/BlockCursor/BlockCursor";
import { Button } from "@/components/ui/Button/Button";
import { ButtonLink } from "@/components/ui/Button/ButtonLink";
import { Eyebrow } from "@/components/ui/Eyebrow/Eyebrow";
import { TextArea } from "@/components/ui/Field/TextArea";
import { TextField } from "@/components/ui/Field/TextField";
import { FramedBox } from "@/components/ui/FramedBox/FramedBox";
import { SectionHeading } from "@/components/ui/SectionHeading/SectionHeading";
import { Spinner } from "@/components/ui/Spinner/Spinner";
import { StatusDot } from "@/components/ui/StatusDot/StatusDot";
import { TextBar } from "@/components/ui/TextBar/TextBar";

import styles from "./page.module.scss";

const BUTTON_SIZES = ["lg", "md", "sm"] as const;

export default function UiPlaygroundPage() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <main className={styles.page}>
      <SectionHeading id="buttons">Buttons</SectionHeading>
      {BUTTON_SIZES.map((size) => (
        <div
          key={size}
          className={styles.row}
        >
          <Eyebrow className={styles.caption}>{size}</Eyebrow>
          <Button size={size}>Primary</Button>
          <Button
            variant="ghost"
            size={size}
          >
            Ghost
          </Button>
          <ButtonLink
            href="#buttons"
            size={size}
          >
            Primary link
          </ButtonLink>
          <ButtonLink
            href="#buttons"
            variant="ghost"
            size={size}
          >
            Ghost link
          </ButtonLink>
        </div>
      ))}
      <div className={styles.row}>
        <Eyebrow className={styles.caption}>states</Eyebrow>
        <Button
          variant="ghost"
          aria-expanded
        >
          Expanded
        </Button>
        <Button variant="ghost">
          Preparing
          <TextBar
            cells={6}
            total={10}
            track="strong"
          />
        </Button>
        <Button variant="ghost">
          <span className={styles.ok}>✓</span>
          CV downloaded
        </Button>
      </div>

      <SectionHeading>Text bars</SectionHeading>
      <div className={styles.column}>
        <span>
          <TextBar
            cells={0}
            total={14}
          />
          {" 0 / 14"}
        </span>
        <span>
          <TextBar
            cells={10.6}
            total={14}
          />
          {" 10.6 / 14"}
        </span>
        <span>
          <TextBar
            cells={20}
            total={14}
          />
          {" 20 / 14 (clamped)"}
        </span>
        <span>
          <TextBar
            cells={5}
            total={12}
            track="strong"
          />
          {" strong track"}
        </span>
      </div>

      <SectionHeading>Looking for a new role with a heading long enough to wrap</SectionHeading>

      <SectionHeading>Small parts</SectionHeading>
      <div className={styles.column}>
        <span>
          {"3 h "}
          <Arrow />
          {" 10 min"}
        </span>
        <Eyebrow>Lighthouse scores</Eyebrow>
        <span className={styles.status}>
          <StatusDot />
          Open to new opportunities
        </span>
        <span>
          <Spinner />
          {" Sending your message…"}
        </span>
        <span className={styles.status}>
          <BlockCursor className={styles.headerCursor} />
          Maxim Starodubov
        </span>
        <span className={styles.title}>
          Engineer
          <BlockCursor
            blinking
            className={styles.titleCursor}
          />
        </span>
      </div>

      <SectionHeading>Framed box and fields</SectionHeading>
      <FramedBox
        title="Write to me"
        titleId="form-title"
        className={styles.box}
      >
        <form
          aria-labelledby="form-title"
          className={styles.column}
        >
          <TextField
            label="Name"
            autoComplete="name"
          />
          <TextField
            label="Email"
            type="email"
            defaultValue="not-an-email"
            error="Enter a valid email address"
          />
          <TextArea label="Message" />
          <Button
            type="submit"
            className={styles.submit}
          >
            Send message
          </Button>
        </form>
      </FramedBox>
    </main>
  );
}
