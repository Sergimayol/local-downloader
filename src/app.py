import os
import streamlit as st
from utils import (
    BASE_DIR,
    DEBUG,
    download_audio,
    validate_url,
    remove_possible_other_files,
    get_audio_name,
    get_audio_data,
)

PLACEHOLDER_URL = "https://www.youtube.com/watch?v=z_aC5xPQ2f4"
OUTPUT_PATH = os.path.join(BASE_DIR, "tmp")  # Base dir /tmp
TMP_KEEP_FILE = ".gitkeep"

# python -m streamlit run src/app.py
if __name__ == "__main__":
    hide_streamlit_style = """<style>footer {visibility: hidden;}</style>"""
    st.markdown(hide_streamlit_style, unsafe_allow_html=True)
    st.title("Local YT Downloader")
    st.subheader("Download audio from YouTube and save to local")
    url = st.text_input("Enter YouTube URL", placeholder=PLACEHOLDER_URL)
    if DEBUG: print(f"[DEBUG]: {url=}")

    if st.button("Introducir", key="introducir", help="Introducir URL"):
        is_valid = validate_url(url)
        if not is_valid:
            st.error("La URL no es válida")
            st.stop()

        remove_possible_other_files(OUTPUT_PATH, files_to_keep=[TMP_KEEP_FILE])

        info = st.info("Preparando la descarga...")
        status = download_audio(url, OUTPUT_PATH)
        if not status:
            info.empty()
            st.error("Error al preparar la descarga")
            st.stop()

        info.empty()
        st.success("El audio se ha procesado correctamente, listo para descargar!")

        audio_name = get_audio_name(OUTPUT_PATH)
        if DEBUG: print(f"[DEBUG]: {audio_name=}")
        if not audio_name:
            st.error("Error al obtener el nombre del archivo")
            st.stop()

        data = get_audio_data(os.path.join(OUTPUT_PATH, audio_name))
        if DEBUG: print(f"[DEBUG]: {len(data)=}")
        if not data:
            st.error("Error al obtener el archivo")
            st.stop()

        st.audio(data, format="audio/mp3", start_time=0)

        # Download button
        if st.download_button(
            label="Descargar audio",
            data=data,
            file_name=audio_name,
            mime="audio/mp3",
            key="download"
        ):
            st.success("Archivo descargado")
