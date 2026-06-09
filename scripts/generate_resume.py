#!/usr/bin/env python3
"""
Generate Phuong Nguyen's resume as a print-ready, ATS-friendly PDF.

Content is sourced from the real work history stored in Hygraph (the same data
that powers the About page). Edit the RESUME dict below and re-run to regenerate:

    python3 -m pip install reportlab
    python3 scripts/generate_resume.py

Output: public/static/resume.pdf
"""

import os

from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT, TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm, mm
from reportlab.platypus import (
    BaseDocTemplate,
    Flowable,
    Frame,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet

# ---------------------------------------------------------------------------
# Brand palette (matches the portfolio site: primary-color #1e90ff)
# ---------------------------------------------------------------------------
ACCENT = HexColor("#1e90ff")
DARK = HexColor("#0f172a")   # slate-900  – name / headings
BODY = HexColor("#334155")   # slate-700  – body text
MUTED = HexColor("#64748b")  # slate-500  – dates / meta
RULE = HexColor("#e2e8f0")   # slate-200  – hairlines

# ---------------------------------------------------------------------------
# Content (truthful — pulled from Hygraph experiences)
# ---------------------------------------------------------------------------
RESUME = {
    "name": "Phuong Nguyen",
    "title": "Senior Software Engineer",
    "contacts": [
        "Ho Chi Minh City, Vietnam",
        "(+84) 932 975 529",
        "phuong.nguyenanh06@gmail.com",
        "phuongculi.com",
        "github.com/phuonganguyen",
        "linkedin.com/in/phuong-nguyen-5b214862",
    ],
    "summary": (
        "Senior Software Engineer with 11+ years of experience designing and building "
        "full-stack web applications and real-time systems across enterprise accounting, "
        "sports live-score, gaming, and chatbot domains. Proven track record of leading "
        "teams, architecting solutions, and adopting modern technologies — from .NET "
        "and Node.js to React / Next.js, Docker, and microservices — to ship reliable "
        "products and raise team efficiency."
    ),
    "experience": [
        {
            "role": "Assistant Department Manager",
            "company": "Nexcel Solutions",
            "dates": "Mar 2025 – Present",
            "location": "Ho Chi Minh City, Vietnam",
            "bullets": [
                "Support the Department Manager in overseeing and coordinating department operations.",
                "Supervise project progress, assign tasks, and ensure quality and deadlines are met.",
                "Drive solution design and implementation, adopting modern technologies "
                "(Docker, .NET, gRPC, n8n, AI tools) to improve efficiency.",
                "Act as a bridge between teams, facilitating problem-solving and process improvements.",
                "Guide team members’ growth through training, mentoring, and fostering collaboration.",
            ],
        },
        {
            "role": "Staff Software Engineer",
            "company": "Nexcel Solutions",
            "dates": "Apr 2022 – Mar 2025",
            "location": "Ho Chi Minh City, Vietnam",
            "bullets": [
                "Researched and applied new technologies to the agency’s website, introducing "
                "fresh enhancements and improved user experiences.",
                "Reviewed code and led the release of new features.",
                "Diagnosed and resolved issues in production environments.",
                "Participated in maintenance and on-call standby work.",
            ],
        },
        {
            "role": "Senior Software Engineer",
            "company": "Lumiplus Software Solutions",
            "dates": "Apr 2020 – Mar 2022",
            "location": "Ho Chi Minh City, Vietnam",
            "bullets": [
                "Led a team of 5 in developing an HTML game for Vietnamese users using "
                "Next.js, Sass, and CSS animation.",
                "Researched and applied new technologies to the product.",
                "Core member of the Game Development team; helped design a front-end and "
                "back-end game framework with Cocos Creator, NestJS / Node.js, Socket.IO, and MongoDB.",
            ],
        },
        {
            "role": "Software Engineer",
            "company": "Nexcel Solution",
            "dates": "Dec 2016 – Mar 2020",
            "location": "Ho Chi Minh City, Vietnam",
            "bullets": [
                "Built a real-time, mobile-friendly sports live-score web application using "
                "ReactJS, Next.js, and Sass.",
                "Developed a chatbot backend service integrated with the company’s system "
                "using ASP.NET Core, microservices, and webhooks.",
                "Full-stack developer for major features of the Accounting and Reporting systems.",
                "Refactored legacy projects, reduced technical debt, and improved code quality.",
                "<b>Awarded Employee of the Quarter.</b>",
            ],
        },
        {
            "role": "Software Engineer",
            "company": "CSC Vietnam (DXC Technology)",
            "dates": "Sep 2014 – Dec 2016",
            "location": "Ho Chi Minh City, Vietnam",
            "bullets": [
                "Developed a next-generation Registration Tracking & Management tool, implementing "
                "core advanced-search, validation, and reporting functions.",
                "Collaborated with the on-site team to propose system solutions using ASP.NET, "
                "AJAX, WCF, SignalR, NHibernate, Oracle, and NUnit.",
                "<b>Awarded Best Performance.</b>",
            ],
        },
    ],
    "skills": [
        ("Languages", "C#, TypeScript, JavaScript, SQL"),
        ("Frontend", "React, Next.js, Sass, CSS animation, HTML5"),
        ("Backend", "ASP.NET Core, Node.js, NestJS, gRPC, WCF, SignalR, Socket.IO, REST, Webhooks, Microservices"),
        ("Databases", "MongoDB, Oracle, NHibernate"),
        ("DevOps & Tools", "Docker, n8n, Git, NUnit, AI tooling"),
        ("Leadership", "Team leadership, mentoring, solution design, code review, Agile"),
    ],
    "education": [
        {
            "degree": "Bachelor of Information Systems",
            "school": "Hoa Sen University",
            "dates": "2014",
            "location": "Ho Chi Minh City, Vietnam",
        },
    ],
}

# ---------------------------------------------------------------------------
# Styles
# ---------------------------------------------------------------------------
styles = getSampleStyleSheet()

name_style = ParagraphStyle(
    "Name", parent=styles["Normal"], fontName="Helvetica-Bold",
    fontSize=21, leading=23, textColor=DARK, spaceAfter=1,
)
title_style = ParagraphStyle(
    "Title", parent=styles["Normal"], fontName="Helvetica",
    fontSize=11, leading=13, textColor=ACCENT, spaceAfter=3,
)
contact_style = ParagraphStyle(
    "Contact", parent=styles["Normal"], fontName="Helvetica",
    fontSize=8.5, leading=11.5, textColor=MUTED,
)
section_style = ParagraphStyle(
    "Section", parent=styles["Normal"], fontName="Helvetica-Bold",
    fontSize=9.8, leading=11.5, textColor=ACCENT, spaceBefore=5, spaceAfter=1,
)
summary_style = ParagraphStyle(
    "Summary", parent=styles["Normal"], fontName="Helvetica",
    fontSize=9.1, leading=12.4, textColor=BODY, alignment=TA_LEFT,
)
role_style = ParagraphStyle(
    "Role", parent=styles["Normal"], fontName="Helvetica-Bold",
    fontSize=10.2, leading=12.4, textColor=DARK,
)
company_style = ParagraphStyle(
    "Company", parent=styles["Normal"], fontName="Helvetica",
    fontSize=9.4, leading=11.5, textColor=BODY, spaceAfter=1,
)
dates_style = ParagraphStyle(
    "Dates", parent=styles["Normal"], fontName="Helvetica",
    fontSize=8.5, leading=11.5, textColor=MUTED, alignment=TA_RIGHT,
)
location_style = ParagraphStyle(
    "Loc", parent=styles["Normal"], fontName="Helvetica-Oblique",
    fontSize=8.3, leading=10.5, textColor=MUTED, alignment=TA_RIGHT,
)
bullet_style = ParagraphStyle(
    "Bullet", parent=styles["Normal"], fontName="Helvetica",
    fontSize=9.0, leading=12.0, textColor=BODY,
    leftIndent=11, bulletIndent=0, spaceAfter=0.8,
)
skill_key_style = ParagraphStyle(
    "SkillKey", parent=styles["Normal"], fontName="Helvetica-Bold",
    fontSize=9.0, leading=12.2, textColor=DARK,
)
skill_val_style = ParagraphStyle(
    "SkillVal", parent=styles["Normal"], fontName="Helvetica",
    fontSize=9.0, leading=12.2, textColor=BODY,
)


class HRule(Flowable):
    """A thin horizontal rule spanning the frame width."""

    def __init__(self, color=RULE, thickness=0.6, space_before=2, space_after=0):
        super().__init__()
        self.color = color
        self.thickness = thickness
        self.space_before = space_before
        self.space_after = space_after
        self.width = 0
        self.height = thickness + space_before + space_after

    def wrap(self, avail_w, avail_h):
        self.width = avail_w
        return avail_w, self.height

    def draw(self):
        self.canv.setStrokeColor(self.color)
        self.canv.setLineWidth(self.thickness)
        y = self.space_after
        self.canv.line(0, y, self.width, y)


def section(label):
    return [Paragraph(label.upper(), section_style), HRule(space_before=1, space_after=3)]


def experience_entry(job, frame_width):
    left = [Paragraph(job["role"], role_style),
            Paragraph(job["company"], company_style)]
    right = [Paragraph(job["dates"], dates_style),
             Paragraph(job["location"], location_style)]
    header = Table(
        [[left, right]],
        colWidths=[frame_width * 0.66, frame_width * 0.34],
    )
    header.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
    ]))
    flow = [header]
    for b in job["bullets"]:
        flow.append(Paragraph(b, bullet_style, bulletText="•"))
    flow.append(Spacer(1, 2))
    return flow


def build():
    out_path = os.path.join(
        os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
        "public", "static", "resume.pdf",
    )

    margin = 1.4 * cm
    doc = BaseDocTemplate(
        out_path, pagesize=A4,
        leftMargin=margin, rightMargin=margin,
        topMargin=1.0 * cm, bottomMargin=0.9 * cm,
        title="Phuong Nguyen — Senior Software Engineer", author="Phuong Nguyen",
    )
    frame = Frame(
        doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="main",
        leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0,
    )
    doc.addPageTemplates([PageTemplate(id="main", frames=[frame])])

    fw = doc.width
    story = []

    # --- Header -----------------------------------------------------------
    story.append(Paragraph(RESUME["name"], name_style))
    story.append(Paragraph(RESUME["title"], title_style))
    sep = '  <font color="#cbd5e1">|</font>  '
    story.append(Paragraph(sep.join(RESUME["contacts"]), contact_style))
    story.append(HRule(color=ACCENT, thickness=1.4, space_before=5, space_after=0))
    story.append(Spacer(1, 4))

    # --- Summary ----------------------------------------------------------
    story += section("Summary")
    story.append(Paragraph(RESUME["summary"], summary_style))

    # --- Experience -------------------------------------------------------
    story += section("Experience")
    for job in RESUME["experience"]:
        story += experience_entry(job, fw)

    # --- Skills -----------------------------------------------------------
    story += section("Technical Skills")
    rows = [[Paragraph(k, skill_key_style), Paragraph(v, skill_val_style)]
            for k, v in RESUME["skills"]]
    skills_tbl = Table(rows, colWidths=[fw * 0.22, fw * 0.78])
    skills_tbl.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0.4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0.4),
    ]))
    story.append(skills_tbl)

    # --- Education --------------------------------------------------------
    story += section("Education")
    for ed in RESUME["education"]:
        left = [Paragraph(ed["degree"], role_style),
                Paragraph(ed["school"], company_style)]
        right = [Paragraph(ed["dates"], dates_style),
                 Paragraph(ed["location"], location_style)]
        edu = Table([[left, right]], colWidths=[fw * 0.66, fw * 0.34])
        edu.setStyle(TableStyle([
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("LEFTPADDING", (0, 0), (-1, -1), 0),
            ("RIGHTPADDING", (0, 0), (-1, -1), 0),
            ("TOPPADDING", (0, 0), (-1, -1), 0),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
        ]))
        story.append(edu)

    doc.build(story)
    print(f"Wrote {out_path}")


if __name__ == "__main__":
    build()
