import { ThumbsUp, Trash } from 'phosphor-react'
import { Avatar } from './Avatar'
import { useState } from 'react'
import styles from './Comment.module.css'

export function Comment({ content, onDeleteComment }) {

  const [likeCount, setLikeCount] = useState(0)
  const [CommentLiked, setCommentLiked] = useState(false);

  function handleDeleteComment() {
    onDeleteComment(content)
  }

  function handleLikeComment() {
    if (!CommentLiked) {
      setLikeCount((state) => {
        return state + 1
      });
      setCommentLiked(true);
    }
  }

  return (
    <div className={styles.comment}>
      <Avatar hasBorder={false} src="https://github.com/bernardooldz.png" alt="" />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Bernardo Diniz</strong>
              <time title='19 de Abril as 14:10' dateTime="2025-04-19">Cerca de 1h atrás</time>
            </div>

            <button onClick={handleDeleteComment} title='Deletar comentário'>
              <Trash size={24} />
            </button>
          </header>

          <p>{content}</p>
        </div>

        <footer>
          <button
            onClick={handleLikeComment}
            disabled={CommentLiked}
            className={CommentLiked ? styles.liked : ''}
          >
            <ThumbsUp className={CommentLiked ? styles.likeOn : styles.likeOff}/>
            {CommentLiked ? <span className={styles.likedText}>Aplaudido</span> : "Aplaudir"}
            <span className={CommentLiked ? styles.specialSpanOn : styles.specialSpan} >{likeCount}</span>
          </button>
        </footer>


      </div>
    </div>
  )
}